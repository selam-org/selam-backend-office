# Generated by Django 4.1.7 on 2023-12-27 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='invoice_number',
        ),
        migrations.AddField(
            model_name='order',
            name='invoice_no',
            field=models.BigIntegerField(default=0, unique=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='confirmation_no',
            field=models.BigIntegerField(unique=True),
        ),
    ]
