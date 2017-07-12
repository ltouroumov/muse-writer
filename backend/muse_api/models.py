from django.db import models
from django.utils import timezone


class Project(models.Model):
    title = models.CharField(max_length=500)
    summary = models.TextField()

    created_date = models.DateTimeField()
    updated_date = models.DateTimeField()

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):

        if not self.created_date:
            self.created_date = timezone.now()

        self.updated_date = timezone.now()

        super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return self.title


class Binder(models.Model):
    project = models.ForeignKey(to='Project', related_name='binders')
    first_child = models.OneToOneField(to='Document', related_name='binder_root', blank=True, null=True)

    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


def get_related(obj, attr, default=None):
    try:
        return getattr(obj, attr)
    except:
        return default


class Document(models.Model):
    binder = models.ForeignKey(to='Binder', related_name='documents')
    next_node = models.OneToOneField(to='Document', related_name='prev_node', null=True, blank=True)
    first_child = models.OneToOneField(to='Document', related_name='parent_node', null=True, blank=True)

    name = models.CharField(max_length=512)

    def first(self):
        node = self
        while hasattr(node, 'prev_node'):
            node = node.prev_node

        return node

    def parent(self):
        if hasattr(self, 'parent_node'):
            return self.parent_node
        elif hasattr(self, 'prev_node'):
            first = self.first()
            return first.parent()
        else:
            return None

    def __str__(self):
        stack = [self]
        parent = self.parent()
        while parent is not None:
            stack.append(parent)
            parent = parent.parent()

        return "{binder} | {path}".format(
            binder=self.binder.name,
            path=str.join(" / ", (node.name for node in reversed(stack)))
        )
