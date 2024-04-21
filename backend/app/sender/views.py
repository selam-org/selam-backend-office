from datetime import datetime
from rest_framework import viewsets, status
from .serializer import SenderSerializer
from rest_framework.response import Response
from .models import Sender
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .filters import OrderFilter
from rest_framework.permissions import IsAuthenticated


class SenderViewSet(viewsets.ModelViewSet):
    queryset = Sender.objects.all().prefetch_related('client')
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = OrderFilter
    search_fields = []
    serializer_class = SenderSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_id = instance.bank_id
        instance.delete()
        return Response({'id': deleted_id}, status=status.HTTP_200_OK)
