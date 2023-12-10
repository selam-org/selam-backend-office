from datetime import datetime
from rest_framework import viewsets, status
from .serializer import SenderSerializer
from rest_framework.response import Response
from .models import Sender


class SenderViewSet(viewsets.ModelViewSet):
    queryset = Sender.objects.all()
    serializer_class = SenderSerializer
    pagination_class = None

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_id = instance.bank_id
        instance.delete()
        return Response({'id': deleted_id}, status=status.HTTP_200_OK)
