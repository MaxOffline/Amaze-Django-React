# Generated by Django 2.2.6 on 2019-10-19 12:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20191019_1234'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='cart',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='backend.Cart'),
            preserve_default=False,
        ),
    ]
