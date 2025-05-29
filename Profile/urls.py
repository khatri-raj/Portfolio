from django.contrib import admin
from django.urls import path
from . import views
from .views import ContactMessageView

urlpatterns = [
    path('',views.home, name='home'),
    path('projects/', views.get_projects, name='project-list'),
    path('contact/', ContactMessageView.as_view(), name='contact'),
    path('experiences/', views.get_experiences, name='get_experiences'),
]