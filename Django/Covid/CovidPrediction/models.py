from django.db import models

# Create your models here.


class Patients(models.Model):
    patient_id = models.AutoField
    user_name = models.CharField(max_length=50,default = "")
    name = models.CharField(max_length=50)
    gender = models.CharField(max_length=50, default="")
    age = models.IntegerField()
    phone_no = models.CharField(max_length=10)
    email = models.EmailField()
    address = models.CharField(max_length=500)
    date = models.DateField()
    time = models.TimeField()
    x_ray_image = models.ImageField(upload_to='CovidPrediction/images', default="")
    covid_status = models.CharField(max_length=10)

    def __str__(self):
        return self.name
    
    
    
class ContactUs(models.Model):  
    
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_no = models.CharField(max_length=10)
    message = models.CharField(max_length=500)
    
    def __str__(self):
        return self.name