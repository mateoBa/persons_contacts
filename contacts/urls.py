from django.conf.urls import url
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from contacts.api import PersonsContactApi
from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='contacts/add_contacts_to_person.html'),
        name='persons_contacts_angular'),
    url(r'^persons/$', views.PersonList.as_view(), name='person_list')
]

person_contact_router = DefaultRouter()
person_contact_router.register(r'persons', PersonsContactApi, base_name="person")
