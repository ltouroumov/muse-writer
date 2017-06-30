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
