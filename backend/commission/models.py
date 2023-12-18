
# Create your models here.
from django.db import models
from user.models import Admin
from agency.models import Agency


class Commission(models.Model):
    id = models.AutoField(primary_key=True)
    start = models.DecimalField(max_digits=20, decimal_places=2)
    end = models.DecimalField(max_digits=20, decimal_places=2)
    commission = models.DecimalField(max_digits=5, decimal_places=2)
    admin = models.ForeignKey(
        Admin,
        related_name='receiver_payment_info',
        on_delete=models.CASCADE,
    )
    agency = models.ForeignKey(
        Agency,
        related_name='agency_payment_info',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'{self.id} - {self.start} - {self.end} - {self.commission} - {self.admin}'
