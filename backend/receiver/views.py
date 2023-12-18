from datetime import datetime
from rest_framework import viewsets, status
from .serializer import ReceiverSerializer
from rest_framework.response import Response
from .models import Receiver
from rest_framework.permissions import IsAuthenticated


class ReceiverViewSet(viewsets.ModelViewSet):
    queryset = Receiver.objects.all()
    serializer_class = ReceiverSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_id = instance.bank_id
        instance.delete()
        return Response({'id': deleted_id}, status=status.HTTP_200_OK)
