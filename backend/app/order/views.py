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
from commission.models import Commission
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        order_obj = serializer.instance

        # Calculate and update commission
        commission_amount = self.calculate_commission(order_obj)
        # Assuming you have a field for commission in Order model
        order_obj.fee = order_obj.net_amount_receiver * \
            (commission_amount / 100)
        order_obj.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def calculate_commission(self, order):
        """
        Calculate the commission based on the agency and the total pay receiver.
        Uses the highest commission if order is greater than all 'end' values,
        and the lowest if it is lower than the least 'end' value.
        """
        agency = order.agency
        net_amount_receiver = order.net_amount_receiver

        highest_commission = Commission.objects.filter(
            agency=agency).order_by('-end').first()
        lowest_commission = Commission.objects.filter(
            agency=agency).order_by('end').first()

        # Default to 0 if no commission records are found
        if not highest_commission or not lowest_commission:
            return 0

        try:
            if net_amount_receiver > highest_commission.end:
                commission_amount = highest_commission.commission
            elif net_amount_receiver < lowest_commission.end:
                commission_amount = lowest_commission.commission
            else:
                # Find the appropriate commission bracket
                commission_record = Commission.objects.filter(
                    agency=agency,
                    end__gte=net_amount_receiver
                ).order_by('end').first()
                commission_amount = commission_record.commission if commission_record else 0
        except Commission.DoesNotExist:
            commission_amount = 0

        return commission_amount

    @action(detail=False, methods=['post'], url_path='create_list')
    def create_list(self, request):
        data = request.data
        for item in data:
            sender, receiver, payment_info, order = transform_data_to_model(
                item)

            sender_obj, created = Sender.objects.get_or_create(
                sender_phone=sender["sender_phone"], defaults=sender)
            # print(sender_obj, 'sender', created)
            receiver['sender'] = sender_obj
            receiver_obj, receiver_created = Receiver.objects.get_or_create(
                receiver_first_name=receiver["receiver_first_name"], receiver_last_name=receiver["receiver_last_name"], defaults=receiver)
            payment_info["receiver"] = receiver_obj
            payment_info_obj, payment_info_created = PaymentInfo.objects.get_or_create(
                bank_name=payment_info["bank_name"], receiver=receiver_obj, defaults=payment_info)
            order["sender"] = sender_obj
            order["receiver"] = receiver_obj
            order["payment_info"] = payment_info_obj
            # order_obj, order_created = Order.objects.create(
            #     defaults=order)
            # print(receiver_obj, sender, payment_info, order_obj)
            order_obj = Order.objects.create(**order)


        return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)
