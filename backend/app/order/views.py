from datetime import datetime
from rest_framework import viewsets, status
from .serializer import OrderSerializer
from rest_framework.response import Response
from .models import Order

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from .serializers import AgencySerializer, ReceiverSerializer, PaymentInfoSerializer, OrderSerializer
from rest_framework.decorators import action
from .util import transform_data_to_model
from sender.models import Sender
from receiver.models import Receiver
from payment_info.models import PaymentInfo
from .models import Order


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = None
    # permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_id = instance.bank_id
        instance.delete()
        return Response({'id': deleted_id}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='create_list')
    def create_list(self, request):
        data = request.data
        for item in data:
            sender, receiver, payment_info, order = transform_data_to_model(
                item)

            sender_obj, created = Sender.objects.get_or_create(
                sender_phone=sender["sender_phone"], defaults=sender)
            print(sender_obj, 'sender', created)
            receiver['sender'] = sender_obj
            receiver_obj, receiver_created = Receiver.objects.get_or_create(
                receiver_first_name=receiver["receiver_first_name"], receiver_last_name=receiver["receiver_last_name"], defaults=receiver)
            payment_info["receiver"] = receiver_obj
            payment_info_obj, payment_info_created = PaymentInfo.objects.get_or_create(
                bank_name=payment_info["bank_name"], receiver=receiver_obj, defaults=payment_info)
            order["sender"] = sender_obj
            order["receiver"] = receiver_obj
            order["payment_info"] = payment_info_obj
            order_obj, order_created = Order.objects.get_or_create(
                defaults=order)
            print(receiver_obj, sender, payment_info, order_obj)

        return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)
