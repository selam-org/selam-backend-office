# Generated by Django 4.1.7 on 2023-12-27 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('receiver', '0003_alter_receiver_receiver_birth_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receiver',
            name='receiver_account',
            field=models.BigIntegerField(unique=True),
        ),
    ]