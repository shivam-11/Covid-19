from django.contrib import admin

# Register your models here.
from .models import Patients, ContactUs

admin.site.register(Patients)
admin.site.register(ContactUs)

