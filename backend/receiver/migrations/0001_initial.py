# Generated by Django 4.1.7 on 2023-12-18 11:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sender', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Receiver',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('receiver_first_name', models.CharField(max_length=100)),
                ('receiver_last_name', models.CharField(max_length=100)),
                ('receiver_country', models.CharField(choices=[('Ethiopia', 'Ethiopia')], max_length=100)),
                ('receiver_city', models.CharField(choices=[('ADDIS ABABA GPO', 'ADDIS ABABA GPO')], max_length=100)),
                ('receiver_state', models.CharField(choices=[('Ethiopia', 'Ethiopia')], max_length=100)),
                ('receiver_phone', models.CharField(max_length=100)),
                ('receiver_address', models.CharField(max_length=100)),
                ('receiver_mother_maiden', models.CharField(max_length=100)),
                ('receiver_birth_date', models.DateField()),
                ('receiver_mobile_phone', models.CharField(max_length=100)),
                ('receiver_account', models.CharField(max_length=100)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client', to='sender.sender')),
            ],
        ),
    ]
