from rest_framework import viewsets, mixins, views, status
from .models import User, Admin, Cashier
from .serializer import UserSerializer, AdminSerializer, CashierSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import viewsets, status


class CashierCreateViewSet(viewsets.ModelViewSet):
    queryset = Cashier.objects.all()
    serializer_class = CashierSerializer
    permission_classes = []

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if "password" in request.data:
            instance.set_password(request.data["password"])
            instance.save()

        return Response(serializer.data)


class AdminsCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    pagination_class = None


class CustomAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            serializer = self.serializer_class(
                data=request.data, context={"request": request}
            )
            serializer.is_valid()
            user = serializer.validated_data["user"]
            token = Token.objects.get(key=response.data["token"])
            response.data["user_id"] = user.id
            response.data["user_type"] = user.user_type
            response.data["username"] = user.email
            response.data["full_name"] = user.full_name
            if user.user_type == "cashier":
                cashier = Cashier.objects.filter(id=user.id).first()
                response.data["agency"] = cashier.agency.id
                response.data["agency_name"] = cashier.agency.name
        return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Successfully logged out."})
