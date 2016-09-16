import datetime

from django.core.exceptions import ValidationError

from contacts.models import Person, Contact
from rest_framework import serializers
from django.core.validators import validate_email


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'first_name', 'last_name', 'address', 'birth_date', 'contacts')

    contacts = serializers.SerializerMethodField()

    def get_contacts(self, obj):
        return obj.get_contacts()

    def validate_birth_date(self, value):
        now = datetime.datetime.now()
        if value.date() >= now.date():
            raise serializers.ValidationError('Birth date can not be bigger or equal than today.')
        return value

    def validate(self, data):
        contacts = self.initial_data.get('contacts', '')
        if len(contacts) == 0:
            raise serializers.ValidationError('Please, charge at least one contact')
        else:
            for contact in contacts:
                if contact.get('contact_type') == 'email':
                    try:
                        validate_email(contact.get('value'))
                    except ValidationError:
                        raise serializers.ValidationError('Incorrect email contact')
                if contact.get('contact_type') in ['phone', 'cel']:
                    try:
                        int(contact.get('value'))
                    except:
                        raise serializers.ValidationError('Error, only number for %s.' % contact.get('contact_type'))
        return data

    def save(self, validated_data):
        contacts = validated_data.pop('contacts')
        if contacts:
            person = Person(**validated_data)
            person.save()
            for co in contacts:
                Contact.objects.create(person=person, contact_type=co.get('contact_type'), value=co.get('value'))
            return person
