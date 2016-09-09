from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from contacts.models import Contact, CONTACT_TYPES
from contacts.models import Person
from contacts.serializer import ContactSerializer


class ContactTypeList(ListAPIView):

    def get(self, request, *args, **kwargs):
        return Response(CONTACT_TYPES)


class PromotionsApi(ModelViewSet):
    """ Show Promotions """
    serializer_class = ContactSerializer
    paginate_by = 100
    paginate_by_param = 'page_size'
    max_paginate_by = 1000
    permission_classes = []

    def get_queryset(self):
        return Person.objects.all()

    def retrieve(self, request, pk=None):
        queryset = Promotion.objects.all()
        promotion = get_object_or_404(queryset, pk=pk)
        serializer = PromotionSerializer(promotion)
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
                    serializer.save()
                    return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logging.exception('Can not create promotion, exception: ' + str(e))
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

    def update(self, request, pk=None):
        return Response('Error, not allowed', status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # @detail_route(methods=['get'], url_path='delete')
    # def delete_promotion(self, request, pk=None):
    #     try:
    #         promotion = Promotion.objects.get(id=pk)
    #     except Merchant.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #
    #     promotion.set_canceled()
    #     return Response(status=status.HTTP_200_OK)