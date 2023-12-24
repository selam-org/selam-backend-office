from user.utils import ADMIN_TYPE
from rest_framework import permissions
from user.models import User

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return "admin" in request.user.user_type and request.user.is_authenticated
