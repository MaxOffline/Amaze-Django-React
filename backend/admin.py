from django.contrib import admin
from backend.models import Products, Cart, CartProduct, TestModel

admin.site.register(CartProduct)
admin.site.register(TestModel)
admin.site.register(Products)
admin.site.register(Cart)