# Generated by Django 4.1.7 on 2023-12-20 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment_info', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentinfo',
            name='account_type',
            field=models.CharField(default='SAVINGS ACCOUNT', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='paymentinfo',
            name='branch',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
