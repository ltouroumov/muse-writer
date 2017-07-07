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


class Binder(models.Model):
    project = models.ForeignKey(to='Project', related_name='binders')
    first_child = models.ForeignKey(to='Document', related_name='binder_root')

    name = models.CharField(max_length=128)


class Document(models.Model):
    binder = models.ForeignKey(to='Binder', related_name='documents')
    path = models.CharField(max_length=512)
    next_node = models.ForeignKey(to='Document', related_name='prev_node', null=True, blank=True)
    first_child = models.ForeignKey(to='Document', related_name='parent_node', null=True, blank=True)

    name = models.CharField(max_length=512)
