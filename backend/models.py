from django.db import models
from django.contrib.auth.models import User





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
        return str(self.user.username)



class CartProduct (models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    _id = models.IntegerField(blank = True )
    quantity = models.IntegerField(default = 0 )


    def __str__(self):
        return self.title


        




