from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.AddPerson.as_view(), name='add_person'),
    url(r'^persons/$', views.PersonList.as_view(), name='person_list'),
]