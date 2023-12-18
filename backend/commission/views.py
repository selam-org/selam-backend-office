from datetime import datetime
from rest_framework import viewsets, status
from .serializer import CommissionSerializer
from rest_framework.response import Response
from .models import Commission

from rest_framework.permissions import IsAuthenticated


class CommissionViewSet(viewsets.ModelViewSet):
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_id = instance.bank_id
        instance.delete()
        return Response({'id': deleted_id}, status=status.HTTP_200_OK)
