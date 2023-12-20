from datetime import datetime
from rest_framework import viewsets, status
from .serializer import CommissionSerializer
from rest_framework.response import Response
from .models import Commission
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from .filters import CommissionFilter


class CommissionViewSet(viewsets.ModelViewSet):
    queryset = Commission.objects.all()
    serializer_class = CommissionSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = CommissionFilter
    search_fields = []
    pagination_class = None
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_id = instance.id
        agency = instance.agency.id
        instance.delete()
        return Response({'id': deleted_id, 'agency': agency}, status=status.HTTP_200_OK)
