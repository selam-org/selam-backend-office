
# Create your models here.
from django.db import models
from sender.models import Sender


class Receiver(models.Model):

    RECEIVER_COUNTRY = [
        ('Ethiopia', 'Ethiopia'),
    ]
    RECEIVER_STATE = [
        ('Ethiopia', 'Ethiopia'),
    ]
    RECEIVER_CITY = [
        ('ADDIS ABABA GPO', 'ADDIS ABABA GPO'),
    ]

    id = models.AutoField(primary_key=True)
    receiver_first_name = models.CharField(max_length=100)
    receiver_last_name = models.CharField(max_length=100)
    receiver_phone = models.CharField(max_length=100)
    # receiver_account = models.AutoField(unique=True)

    receiver_country = models.CharField(
        max_length=100, choices=RECEIVER_COUNTRY)
    receiver_city = models.CharField(max_length=100, choices=RECEIVER_CITY)
    receiver_state = models.CharField(max_length=100, choices=RECEIVER_STATE)
    receiver_phone = models.CharField(max_length=100)
    receiver_address = models.CharField(max_length=100, blank=True, null=True)
    receiver_mother_maiden = models.CharField(
        max_length=100, blank=True, null=True)
    receiver_birth_date = models.DateField(blank=True, null=True)
    receiver_mobile_phone = models.CharField(
        max_length=100, blank=True, null=True)
    receiver_account = models.CharField(max_length=100)

    sender = models.ForeignKey(
        Sender,
        related_name='client',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'{self.id}- {self.receiver_address} - {self.receiver_phone} - {self.receiver_mobile_phone} - {self.sender} '

    # def save(self, *args, **kwargs):
    #     if not self.receiver_account:
    #         # Find the latest invoice number and increment it
    #         last_receiver = Receiver.objects.order_by(
    #             '-receiver_account').first()
    #         if last_receiver:
    #             last_receiver_account = last_receiver.receiver_account
    #             self.receiver_account = last_receiver_account + 1
    #         else:
    #             self.receiver_account = 132114
