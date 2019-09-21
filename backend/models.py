from django.db import models





# DB Products.
class Categories (models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name



        




