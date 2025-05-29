from django.contrib import admin
from django.urls import path
from . import views
from .views import ContactMessageView
from django.urls import path, re_path
from .views import FrontendAppView

urlpatterns = [
    path('',views.home, name='home'),
    path('projects/', views.get_projects, name='project-list'),
    path('contact/', ContactMessageView.as_view(), name='contact'),
    path('experiences/', views.get_experiences, name='get_experiences'),
    re_path(r'^.*$', FrontendAppView.as_view(), name='frontend'),

]