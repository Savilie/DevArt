from django.db import models

# Create your models here.


class Bid(models.Model):
    name = models.CharField(max_length=255, verbose_name="Имя заказчика")
    number = models.CharField(max_length=20, verbose_name="Номер телефона")
    comment = models.TextField(max_length=500, verbose_name="Комментарий к заказу")
    email = models.EmailField(unique=False, verbose_name="Email заказчика")
    file = models.FileField(upload_to="files", verbose_name="Файл заказчика")
