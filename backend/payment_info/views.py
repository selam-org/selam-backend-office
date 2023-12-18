from datetime import datetime
from rest_framework import viewsets, status
from .serializer import PaymentInfoSerializer
from rest_framework.response import Response
from .models import PaymentInfo
from rest_framework.permissions import IsAuthenticated


class PaymentInfoViewSet(viewsets.ModelViewSet):
    queryset = PaymentInfo.objects.all()
    serializer_class = PaymentInfoSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_id = instance.bank_id
        instance.delete()
        return Response({'id': deleted_id}, status=status.HTTP_200_OK)
