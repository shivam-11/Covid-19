from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
from . serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib import messages
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from keras.models import load_model
import numpy as np
from keras.preprocessing import image
from datetime import date
from datetime import datetime
import cv2
from .serializers import patientSerializer, ContactUsSerializer
from PIL import Image
from keras.preprocessing import image
import base64
import os
import smtplib
from rest_framework.parsers import FormParser, MultiPartParser
from .models import Patients




class Registration(APIView):
    "Register View"
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)
            #return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        

class Login(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data['user'])
        user = serializer.validated_data['user']
        print(serializer.validated_data['user'])
        login(request, user)
        return super(Login,self).post(request, format=None)
        #print(result)
        #return Response(status= status.HTTP_200_OK)
    
    

class DashBoard(APIView):
    permission_classes = (IsAuthenticated,)  
          

    def post(self, request):
        #data = FormParser().parse(request)
        print("hello1")
        print(request.data)
        model = load_model('CovidPrediction/statics/covid_x_ray')
        print("hello2")
        test_image = request.data['x_ray_image']
        my_string = base64.b64encode(test_image.read())
        decodeit = open('CovidPrediction/temp/pred.jpeg', 'wb')
        decodeit.write(base64.b64decode(my_string))
        decodeit.close()
        
        test_image = image.load_img('CovidPrediction/temp/pred.jpeg', target_size = (64, 64))
        os.remove('CovidPrediction/temp/pred.jpeg')
        test_image = image.img_to_array(test_image)
        test_image = np.expand_dims(test_image, axis = 0)
        result = model.predict(test_image)
        
        if result[0][0] == 1:
            status = 'Non-COVID'
        else:
            status = 'COVID'
        print(request.data)    
        data = {'user_name' : request.data['user_name'], 
                'name' : request.data['name'],
                'gender' : request.data['gender'],
                'age' : request.data['age'],
                'phone_no' : request.data['phone_no'],
                'email' : request.data['email'],
                'address' : request.data['address'],
                'date' : date.today(),
                'time' : datetime.now().strftime("%H:%M:%S"),
                'x_ray_image' : request.data['image'],
                'covid_status' : status } 
        
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login('shivam99cs@gmail.com','benitgdciqtaiopa')
        server.sendmail('shivam99cs@gmail.com',request.data['email'],"If you have any symptom related to covid then contact your closest covid center. Because this is only for learning and research purpose.") 
        server.quit() 
        
        serializer = patientSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    
        content = {'message': f'{status}'}
        return Response(content)   
    
    
    
class ContactUs(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self,request):
        print(request.data)
        serializer = ContactUsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)
        
        
class History(APIView):
    
    
    def post(self, request):
        
        print(request.data['username']) 
        data = Patients.objects.filter(user_name = request.data['username']).values("id","name",
                                                                                    "gender",
                                                                                    "age",
                                                                                    "phone_no",
                                                                                    "email",
                                                                                    "address",
                                                                                    "date",
                                                                                    "time",
                                                                                    "covid_status")
        #date = data['date'].strftime("%m/%d/%Y")
        data_list = list()
        for x in data:
            x['date'] = x['date'].strftime("%m/%d/%Y")
            x['time'] = x['time'].strftime("%H:%M:%S")
            data_list.append(x)
        print(data_list)
        return Response(data_list,status = status.HTTP_200_OK)
        
    