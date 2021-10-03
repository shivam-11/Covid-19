# -*- coding: utf-8 -*-

from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from . import views
from knox import views as knox_views



urlpatterns = [
    path('registration/',views.Registration.as_view(), name='registration'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('dash/', views.DashBoard.as_view(), name='dash'),
    path('contactus/', views.ContactUs.as_view(), name='dash'),
    path('history/', views.History.as_view(), name='history')
]