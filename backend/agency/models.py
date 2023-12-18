
# Create your models here.
from django.db import models


class Agency(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    rate = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self):
        return f'{self.id} - {self.name} - {self.address}'
