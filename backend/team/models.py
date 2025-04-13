from django.db import models

# Create your models here.


class Team(models.Model):
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=250)
    photo = models.ImageField(upload_to='photos')

