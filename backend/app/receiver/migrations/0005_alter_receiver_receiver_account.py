# Generated by Django 4.1.7 on 2023-12-27 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('receiver', '0004_alter_receiver_receiver_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receiver',
            name='receiver_account',
            field=models.CharField(max_length=100),
        ),
    ]