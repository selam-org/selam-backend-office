# Generated by Django 4.1.7 on 2023-12-19 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('receiver', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receiver',
            name='receiver_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='receiver',
            name='receiver_mobile_phone',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
