from rest_framework import serializers
from .models import Sender
from receiver.serializer import ReceiverSerializer


class SenderSerializer(serializers.ModelSerializer):
    client = ReceiverSerializer(many=True, read_only=True)

    class Meta:
        model = Sender
        fields = "__all__"
