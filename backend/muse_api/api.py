from django.conf.urls import url
from django.http import HttpRequest
from django.db import transaction
from tastypie.authorization import Authorization
from tastypie.exceptions import BadRequest
from tastypie.resources import ModelResource
from tastypie.utils import trailing_slash
from tastypie import fields
from muse_api.models import Project, Binder, Document
import json


class ProjectResource(ModelResource):

    # created_date = fields.DateTimeField()
    # updated_date = fields.DateTimeField()

    binders = fields.ToManyField(to='muse_api.api.BinderResource', attribute='binders')

    class Meta:
        queryset = Project.objects.all()
        resource_name = 'project'

        authorization = Authorization()
        always_return_data = True


class BinderResource(ModelResource):
    project = fields.ForeignKey(to='muse_api.api.ProjectResource', attribute='project')
    first_child = fields.ForeignKey(to='muse_api.api.DocumentResource', attribute='first_child', null=True)

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/tree%s$" % (self._meta.resource_name, trailing_slash()),
                self.wrap_view('tree'),
                name="api_binder_tree"),
        ]

    def tree(self, request: HttpRequest, **kwargs):
        self.method_check(request, allowed=['get'])
        self.is_authenticated(request)
        self.throttle_check(request)

        pk = kwargs.pop('pk')
        binder = Binder.objects.get(id=pk)

        def build_node(node: Document):
            data = {
                'id': node.id,
                'name': node.name,
            }

            if node.first_child:
                data['children'] = build_nodes(node.first_child)

            return data

        def build_nodes(head: Document):
            documents = [build_node(head)]

            node = head
            while node.next_node:
                node = node.next_node
                documents.append(build_node(node))

            return documents

        if binder.first_child:
            doc_tree = build_nodes(binder.first_child)
        else:
            doc_tree = []

        return self.create_response(request, doc_tree)

    def build_filters(self, filters=None, ignore_bad_filters=False):
        if not filters:
            filters = {}

        orm_filters = super().build_filters(filters, True)

        if 'project' in filters:
            orm_filters['project_id'] = filters['project']

        return orm_filters

    class Meta:
        queryset = Binder.objects.all()
        resource_name = 'binder'

        authorization = Authorization()
        always_return_data = True


class DocumentResource(ModelResource):
    binder = fields.ForeignKey(to='muse_api.api.BinderResource', attribute='binder')

    first_child = fields.ForeignKey(to='muse_api.api.DocumentResource', attribute='first_child', null=True)
    next_node = fields.ForeignKey(to='muse_api.api.DocumentResource', attribute='next_node', null=True)

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/move%s$" % (self._meta.resource_name, trailing_slash()),
                self.wrap_view('move_document'),
                name="api_move_document"),
        ]

    def move_document(self, request: HttpRequest, **kwargs):
        self.method_check(request, allowed=['post'])
        self.is_authenticated(request)
        self.throttle_check(request)

        def save_modified(modified):
            [obj.save() for obj in modified]

        def extract_from_tree(cur_node: Document):
            # Are we in the middle of a chain ?
            if hasattr(cur_node, 'prev_node'):
                print("ET:PATH1")
                # Linked List Extraction!
                prev_node = cur_node.prev_node
                prev_node.next_node = cur_node.next_node
                cur_node.next_node = None
                return [cur_node, prev_node]
            # We are the head of list, are we a child ?
            elif hasattr(cur_node, 'parent_node'):
                print("ET:PATH2")
                # We are! Substitute parent's first_child with next_node
                parent_node = cur_node.parent_node
                parent_node.first_child = cur_node.next_node
                cur_node.next_node = None
                return [cur_node, parent_node]
            # We are the root of the tree!
            elif hasattr(cur_node, 'binder_root'):
                print("ET:PATH3")
                binder = cur_node.binder_root
                binder.first_child = cur_node.next_node
                cur_node.next_node = None
                return [cur_node, binder]
            # Already out of tree
            # should not happen
            else:
                print("ET:PATH4")
                return []

        def insert_after(node: Document, target: Document):
            node.next_node = target.next_node
            target.next_node = node
            return [target, node]

        def insert_before(node: Document, target: Document):
            # Target is in the middle of the list
            if hasattr(target, 'prev_node'):
                print("IB:PATH1")
                prev_node = target.prev_node
                prev_node.next_node = node
                node.next_node = target
                return [prev_node, node]
            # Target is at the head of the list, are we a child?
            elif hasattr(target, 'parent_node'):
                print("IB:PATH2")
                parent_node = target.parent_node
                parent_node.first_child = node
                node.next_node = target
                return [parent_node, node]
            # Target is root of the tree
            else:
                print("IB:PATH3")
                binder = target.binder_root
                binder.first_child = node
                node.next_node = target
                return [binder, node]

        def insert_inside(node: Document, target: Document):
            node.next_node = target.first_child
            target.first_child = node
            return [target, node]

        with transaction.atomic():
            node_to_move = Document.objects.get(id=kwargs.pop('pk'))
            modified = extract_from_tree(node_to_move)
            save_modified(modified)

            body = json.loads(request.body.decode('utf-8'))
            if 'before' in body:
                target_node = Document.objects.get(id=body['before'])
                modified = insert_before(node_to_move, target_node)
            elif 'after' in body:
                target_node = Document.objects.get(id=body['after'])
                modified = insert_after(node_to_move, target_node)
            elif 'inside' in body:
                target_node = Document.objects.get(id=body['inside'])
                modified = insert_inside(node_to_move, target_node)
            else:
                raise BadRequest()

            save_modified(modified)

        return self.create_response(request, {})

    def build_filters(self, filters=None, ignore_bad_filters=False):
        if not filters:
            filters = {}

        orm_filters = super().build_filters(filters, True)

        if 'project' in filters:
            orm_filters['binder__project_id'] = filters['project']

        if 'binder' in filters:
            orm_filters['binder_id'] = filters['binder']

        return orm_filters

    class Meta:
        queryset = Document.objects.all()
        resource_name = 'document'

        authorization = Authorization()
        always_return_data = True
