from django.urls import path
from django.conf.urls import url


from . import views

app_name = 'generator'

urlpatterns = [
    url(r'^list$', views.ListView.as_view(), name='list'),
    url(r'^character_(?P<id>[0-9]+)/$', views.CharacterDetailView, name='detail'),
    url(r'^create$', views.CharacterCreateView.as_view(), name='create'),
    url(r'^create/races/?$', views.racefilter, name='race-filter'),
    url(r'^create/theme/?$', views.themefilter, name='theme-filter'),
    url(r'^create/class/?$', views.classfilter, name='class-filter'),
]