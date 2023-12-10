"""office URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path
from user.views import CustomAuthTokenView
from user.views import LogoutView
from django.contrib import admin
from django.urls import path
from user.views import CashierCreateViewSet
from agency.views import AgencyViewSet
from sender.views import SenderViewSet
from receiver.views import ReceiverViewSet
from payment_info.views import PaymentInfoViewSet
schema_view = get_schema_view(
    openapi.Info(
        title="SELAM OFFICE API Docs",
        default_version='v1',
    ),
    public=True,
    permission_classes=[],
)
router = DefaultRouter()
router.register(r'agencies', AgencyViewSet, basename='agencies')
router.register(r'cashiers', CashierCreateViewSet, basename='cashiers')
router.register(r'senders', SenderViewSet, basename='senders')
router.register(r'receivers', ReceiverViewSet, basename='receivers')
router.register(r'payment_infos', PaymentInfoViewSet, basename='payment_infos')

urlpatterns = router.urls
urlpatterns += [
    path("docs/", schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path("admin/", admin.site.urls),
    path('auth/', CustomAuthTokenView.as_view(), name='api_token_auth'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
