from datetime import datetime
import pytz
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
# from rest_framework.authtoken.models import Token
from random import choice
from user.managers import UserManager
from user.utils import USER_TYPES
from agency.models import Agency


class User(AbstractUser):
    user_type = models.CharField(
        choices=USER_TYPES, max_length=150, default=USER_TYPES[1][0])
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    # Change to use email for authentication
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.id} - {self.full_name} - {self.user_type} - {self.email}"

    class Meta:
        swappable = 'AUTH_USER_MODEL'


class Admin(User):
    class Meta:
        verbose_name = "Admin"
        verbose_name_plural = "Admins"

    def save(self, *args, **kwargs):
        self.user_type = USER_TYPES[1][0]
        super(Admin, self).save(*args, **kwargs)


class Cashier(User):
    agency = models.ForeignKey(
        Agency, on_delete=models.CASCADE, related_name="agencies")

    class Meta:
        verbose_name = "Cashier"
        verbose_name_plural = "Cashiers"

    def save(self, *args, **kwargs):
        self.user_type = USER_TYPES[2][0]
        super(Cashier, self).save(*args, **kwargs)
