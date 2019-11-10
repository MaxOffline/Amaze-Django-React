from django.db import models
from django.contrib.auth.models import User
import random
# Company Products.
class Products (models.Model):
    product_id = models.IntegerField(blank = False)
    newarrival = models.BooleanField(default = False)
    liked = models.BooleanField(default = False)
    active = models.BooleanField(default = False)
    featured = models.BooleanField(default = False)
    title = models.CharField(max_length = 50)
    category = models.CharField(max_length = 50)
    price = models.IntegerField(default = 300)
    imgUrl = models.URLField(max_length= 200)
    
    def __str__(self):
        return self.title

# User Cart Products
class Cart (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank = True, null = True)

    def __str__(self):
        if self.user.username:
            return str(self.user.username)
        return str(self.user)

class CartProduct (models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product_id = models.IntegerField(blank = False)
    newarrival = models.BooleanField(default = False)
    liked = models.BooleanField(default = False)
    active = models.BooleanField(default = False)
    featured = models.BooleanField(default = False)
    title = models.CharField(max_length = 50)
    category = models.CharField(max_length = 50)
    price = models.IntegerField(default = 300)
    imgUrl = models.URLField(max_length= 200)
    quantity = models.IntegerField(default = 0, blank = True, null = True)


    def __str__(self):
        return self.title




class ResetCode (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank = True, null = True)
    reset_code = models.IntegerField(default = random.randint(100000, 1000000),blank = True, null = True)

    def __str__(self):
        return self.user.username
