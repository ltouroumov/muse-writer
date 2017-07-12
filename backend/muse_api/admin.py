from django.contrib import admin

from muse_api.models import *


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_date', 'updated_date')


class BinderAdmin(admin.ModelAdmin):
    pass


class DocumentAdmin(admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(Project, ProjectAdmin)
admin.site.register(Binder, BinderAdmin)
admin.site.register(Document, DocumentAdmin)
