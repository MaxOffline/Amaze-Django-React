# Generated by Django 2.2.6 on 2019-10-19 12:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_product_cart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='cart',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.Cart'),
        ),
    ]