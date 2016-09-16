from django.db import transaction

from rest_framework import status
from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets

from contacts.models import Contact, CONTACT_TYPES
from contacts.models import Person
from contacts.serializer import PersonSerializer


class ContactTypeList(ListAPIView):
    def get(self, request, *args, **kwargs):
        return Response(CONTACT_TYPES)


class PersonsContactApi(viewsets.ModelViewSet):
    """ Show Persons """
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    paginate_by = 100
    paginate_by_param = 'page_size'
    max_paginate_by = 1000

    def retrieve(self, request, pk=None):
        queryset = Person.objects.all()
        promotion = get_object_or_404(queryset, pk=pk)
        serializer = PersonSerializer(promotion)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        return Response('Error, not allowed', status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        return Response('Error, not allowed', status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            if serializer.is_valid():
                with transaction.atomic():
                    serializer.save(request.data)
                    return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def update(self, request, pk=None):
        return Response('Error, not allowed', status=status.HTTP_405_METHOD_NOT_ALLOWED)
