# Generated by Django 2.2.6 on 2019-10-19 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_auto_20191019_0229'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='name',
            field=models.CharField(default='22', max_length=50),
        ),
    ]