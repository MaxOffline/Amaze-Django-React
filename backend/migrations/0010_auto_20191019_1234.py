# Generated by Django 2.2.6 on 2019-10-19 12:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20191019_1231'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='title',
            new_name='user',
        ),
    ]
