from rest_framework import viewsets, mixins, views, status
from .models import User, Admin, Cashier
from .serializer import UserSerializer, AdminSerializer, CashierSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework.views import APIView


class CashierCreateViewSet(mixins.CreateModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.ListModelMixin,
                           viewsets.GenericViewSet):
    queryset = Cashier.objects.all()
    serializer_class = CashierSerializer


class CustomAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            serializer = self.serializer_class(
                data=request.data, context={'request': request})
            serializer.is_valid()
            user = serializer.validated_data['user']
            token = Token.objects.get(key=response.data['token'])
            response.data['user_id'] = user.id
            response.data['user_type'] = user.user_type
            response.data['username'] = user.phone_number
            response.data['full_name'] = user.full_name
        return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Successfully logged out."})
