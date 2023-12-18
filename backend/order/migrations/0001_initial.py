# Generated by Django 4.1.7 on 2023-12-18 11:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sender', '0001_initial'),
        ('receiver', '0001_initial'),
        ('agency', '0001_initial'),
        ('payment_info', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('invoice_number', models.CharField(max_length=100)),
                ('confirmation_no', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('sender_currency', models.CharField(max_length=100)),
                ('received_currency', models.CharField(max_length=100)),
                ('rate_change_receiver', models.DecimalField(decimal_places=2, max_digits=10)),
                ('net_amount_receiver', models.DecimalField(decimal_places=2, max_digits=10)),
                ('fee', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_type', models.CharField(choices=[('check', 'Check'), ('cash', 'Cash')], max_length=100)),
                ('total_pay_receiver', models.DecimalField(decimal_places=2, max_digits=10)),
                ('agency', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_agencies', to='agency.agency')),
                ('payment_info', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='payment_infos', to='payment_info.paymentinfo')),
                ('receiver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='receivers', to='receiver.receiver')),
                ('sender', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='senders', to='sender.sender')),
            ],
        ),
    ]
