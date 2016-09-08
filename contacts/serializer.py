import datetime

from contacts.models import Person
from rest_framework import serializers


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'first_name', 'last_name', 'address', 'birth_date', 'contacts')

    contacts = serializers.ListField(required=False)

    def get_contacts(self, obj):
        return obj.get_contacts()

    def get_images(self, obj):
        return obj.get_images()

    def validate_birth_date(self, value):
        now = datetime.datetime.now()
        if value.date() >= now.date():
            raise serializers.ValidationError('Fecha de nacimiento no puede ser mayor o igual a hoy')
        return value

    def validate(self, data):
        contacts = data.get('contacts', '')
        if len(contacts) == 0:
            raise serializers.ValidationError('Por favor, cargar como minimo un contacto')

        return data

    def create(self, validated_data):
        request = self.context['request']
        contacts = validated_data.pop('contacts')
        if contacts:
            person = Person(**validated_data)
            person.save()
            for co in contacts:


        logo = None
        if 'logo' in validated_data.keys():
            logo = validated_data.pop('logo')
        merchant = Merchant.objects.get(account__user=request.user)
        promotion = Promotion(**validated_data)
        promotion.merchant = merchant
        promotion.save()
        promotion.save_images(banner, logo)
        promotion.save_options(promotion_options)
        return promotion