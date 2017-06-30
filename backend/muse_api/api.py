from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie import fields
from muse_api.models import Project


class ProjectResource(ModelResource):

    # created_date = fields.DateTimeField()
    # updated_date = fields.DateTimeField()

    class Meta:
        queryset = Project.objects.all()
        resource_name = 'project'
        authorization = Authorization()
        always_return_data = True
