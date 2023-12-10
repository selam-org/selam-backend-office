
# Create your models here.
from django.db import models
from receiver.models import Receiver


class PaymentInfo(models.Model):
    id = models.AutoField(primary_key=True)
    bank_name = models.CharField(max_length=100)
    bank_account = models.CharField(max_length=100)
    point_of_payment = models.CharField(max_length=100)
    mode_pay_receiver = models.CharField(max_length=100)
    receiver = models.ForeignKey(
        Receiver,
        related_name='receiver_payment_info',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'{self.id} - {self.bank_name}'
