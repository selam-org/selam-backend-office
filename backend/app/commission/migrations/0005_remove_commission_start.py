# Generated by Django 4.1.7 on 2023-12-27 15:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commission', '0004_alter_commission_unique_together'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commission',
            name='start',
        ),
    ]
