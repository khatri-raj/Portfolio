from django.contrib import admin
from .models import Project, ContactMessage, Experience

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'link', 'tech_stack')  # add tech_stack here if needed
    search_fields = ('title', 'tech_stack')

admin.site.register(Project, ProjectAdmin)
admin.site.register(ContactMessage)
admin.site.register(Experience)
