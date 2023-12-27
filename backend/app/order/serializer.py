from rest_framework import serializers
from agency.serializer import AgencySerializer
from sender.serializer import SenderSerializer
from receiver.serializer import ReceiverSerializer
from payment_info.serializer import PaymentInfoSerializer
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    agency_obj = serializers.SerializerMethodField("get_agency")
    sender_obj = serializers.SerializerMethodField("get_sender")
    receiver_obj = serializers.SerializerMethodField("get_receiver")
    payment_info_obj = serializers.SerializerMethodField("get_payment_info")

    def get_agency(self, obj):
        agency = AgencySerializer(obj.agency).data
        return agency

    def get_sender(self, obj):
        sender = SenderSerializer(obj.sender).data
        return sender

    def get_receiver(self, obj):
        receiver = ReceiverSerializer(obj.receiver).data
        return receiver

    def get_payment_info(self, obj):
        payment_info = PaymentInfoSerializer(obj.payment_info).data
        return payment_info

    class Meta:
        model = Order
        fields = "__all__"
