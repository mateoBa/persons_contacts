from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

CONTACT_TYPES = (
    ('email', 'Email'),
    ('facebook', 'Facebook'),
    ('twitter', 'Twitter'),
    ('linkedin', 'LinkedIn'),
    ('phone', 'Phone'),
    ('cel', 'Celphone'),
)


class Person(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    birth_date = models.DateTimeField('Birth Date')

    def get_contacts(self):
        person_contacts = Contact.objects.filter(person=self)
        contacts = []
        for co in person_contacts:
            contacts.append(co.to_dict())
        return contacts


class Contact(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    contact_type = models.CharField(max_length=100, help_text="Contact type", choices=CONTACT_TYPES)
    value = models.CharField(max_length=200)
