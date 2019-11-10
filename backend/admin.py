from django.contrib import admin
from backend.models import Products, Cart, CartProduct,ResetCode

admin.site.register(CartProduct)
admin.site.register(Products)
admin.site.register(Cart)
admin.site.register(ResetCode)
