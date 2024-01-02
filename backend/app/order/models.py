from django.db import models
from agency.models import Agency
from sender.models import Sender
from receiver.models import Receiver
from payment_info.models import PaymentInfo


class Order(models.Model):
    PAYMENT_TYPE = [
        ("check", "Check"),
        ("cash", "Cash"),
    ]

    id = models.AutoField(primary_key=True)
    invoice_no = models.BigIntegerField(unique=True, default=0)
    confirmation_no = models.BigIntegerField(unique=True)
    date = models.DateField()
    sender_currency = models.CharField(max_length=100)
    received_currency = models.CharField(max_length=100)
    rate_change_receiver = models.DecimalField(decimal_places=2, max_digits=10)
    net_amount_receiver = models.DecimalField(decimal_places=2, max_digits=10)
    fee = models.DecimalField(decimal_places=2, max_digits=10)
    payment_type = models.CharField(max_length=100, choices=PAYMENT_TYPE)
    total_pay_receiver = models.DecimalField(decimal_places=2, max_digits=10)

    agency = models.ForeignKey(
        Agency, on_delete=models.SET_NULL, blank=True, null=True, related_name="order_agencies")
    sender = models.ForeignKey(
        Sender, on_delete=models.SET_NULL, blank=True, null=True, related_name="senders")
    receiver = models.ForeignKey(
        Receiver, on_delete=models.SET_NULL, blank=True, null=True, related_name="receivers")
    payment_info = models.ForeignKey(
        PaymentInfo, on_delete=models.SET_NULL, blank=True, null=True, related_name="payment_infos")

    def __str__(self):
        return f'{self.id} - {self.sender} - {self.invoice_no} - {self.confirmation_no} - {self.receiver} - {self.payment_info}'

    def save(self, *args, **kwargs):
        if not self.invoice_no:
            # Find the latest invoice number and increment it
            last_order = Order.objects.order_by('-invoice_no').first()
            if last_order:
                last_invoice_no = last_order.invoice_no
                self.invoice_no = last_invoice_no + 1
            else:
                self.invoice_no = 125234  # Initial value
            # self.invoice_no = 125234
        if not self.confirmation_no:
            # Find the latest confirmation number and increment it
            last_order = Order.objects.order_by('-confirmation_no').first()
            if last_order:
                last_confirmation_no = last_order.confirmation_no
                self.confirmation_no = last_confirmation_no + 1
            else:
                self.confirmation_no = 121342537692  # Initial value
            # self.confirmation_no = 121342537692

        super().save(*args, **kwargs)
