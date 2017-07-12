from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie import fields
from muse_api.models import Project, Binder, Document


class ProjectResource(ModelResource):

    # created_date = fields.DateTimeField()
    # updated_date = fields.DateTimeField()

    class Meta:
        queryset = Project.objects.all()
        resource_name = 'project'

        authorization = Authorization()
        always_return_data = True


class BinderResource(ModelResource):
    project = fields.ForeignKey(to='muse_api.api.ProjectResource', attribute='project')
    first_child = fields.ForeignKey(to='muse_api.api.DocumentResource', attribute='first_child', null=True)

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
