from django.contrib import admin

# Register your models here.
from .models import User, Admin, Cashier

admin.site.register(User)
admin.site.register(Admin)
admin.site.register(Cashier)
