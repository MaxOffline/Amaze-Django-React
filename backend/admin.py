from django.contrib import admin
from backend.models import Products, Cart, CartProduct

admin.site.register(Cart)
admin.site.register(CartProduct)
admin.site.register(Products)
