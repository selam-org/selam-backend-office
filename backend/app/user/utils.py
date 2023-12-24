from django.db import models

ADMIN_TYPE = 'admin'
CASHIER_TYPE = 'cashier'

USER_TYPES = [
    ("sys-admin", "System Administrator"),
    (ADMIN_TYPE, "Administrator"),
    (CASHIER_TYPE, "Cashier"),
]
