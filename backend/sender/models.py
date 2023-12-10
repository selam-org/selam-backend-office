
# Create your models here.
from django.db import models


class Sender(models.Model):

    id = models.AutoField(primary_key=True)
    sender_first_name = models.CharField(max_length=100)
    sender_last_name = models.CharField(max_length=100)
    sender_phone = models.CharField(max_length=100)
    sender_country = models.CharField(
        max_length=100)
    sender_city = models.CharField(max_length=100)
    sender_state = models.CharField(max_length=100)
    sender_phone = models.CharField(max_length=100, unique=True)
    sender_address = models.CharField(max_length=100)
    sender_mother_maiden = models.CharField(max_length=100)
    sender_birth_date = models.DateField()
    sender_mobile_phone = models.CharField(max_length=100)
    sender_account = models.CharField(max_length=100)
    sender_ssn = models.CharField(max_length=100)
    id_type = models.CharField(max_length=100)
    sender_state_identification = models.CharField(max_length=100)
    sender_country_identification = models.CharField(max_length=100)
    sender_identification_number = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.id} - {self.sender} - {self.sender_address} - {self.sender_phone} - {self.sender_mobile_phone} '
