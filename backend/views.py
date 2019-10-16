# ******Django******
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.http import Http404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
# ******Rest Framework*******
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
# ******Local Directories******
from backend.serializers import CategoriesSerializer, SignupSerializer, LoginSerializer, LogoutSerializer
from backend import serializers
from backend.models import Categories


""" Home Page View """


class index(View):

    def get(self, request):
        
        return render(request, "index.html", {})


""" User Authentication Section """


class Signup(APIView):

    serializer_class = serializers.SignupSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            try:
                #  Try and except statatements are for handling the User.DoesNotExist error
                exists = User.objects.get(
                    username=serializer.validated_data.get('username'))
                return Response("Account already exists")
            #  If username is NOT in the database already
            except:
                # Create user instance
                user = User.objects.create_user(
                    username=serializer.validated_data.get('username'),
                    first_name=serializer.validated_data.get('first_name'),
                    last_name=serializer.validated_data.get('last_name'),
                    email=serializer.validated_data.get('email'),
                    password=serializer.validated_data.get('password')
                )
                user.save()
                return Response("allow", status = status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):

    def get(self, request):
        logout(request)
        return Response("logged out", status = status.HTTP_200_OK)
        


class Login(APIView):

    serializer_class = serializers.LoginSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data.get('username'), password=serializer.validated_data.get('password')
            )
            if user is not None:
                login(request, user)
                return Response("allow", status = status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


""" Products Section """


class CategoriesList(APIView):

    # Needs to be defined so we can get HTML form option in the API view
    serializer_class = serializers.CategoriesSerializer

    def get(self, request, format=None):
        categories = Categories.objects.all()
        serializer = CategoriesSerializer(categories, many=True)
        if request.user.is_authenticated:
            return Response({"authenticated": True})
        return Response(serializer.data)

    def post(self, request):
        """serializer will accept the data input and push it back to
            the CategoriesSerializer in serializers.py """
        serializer = CategoriesSerializer(data=request.data)

        """is_valid() will run validation on the model fields attributes as specified
            in models.py """
        if serializer.is_valid():

            """Specfic fields can be selected as follows,
                name = serializer.validated_data.get('name') """

            serializer.save()
            # Response can be anything...
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Replace the whole object with every field with the new input in the request

    def put(self, request, pk=None):
        return Response({"message": "Put"})

    # Update only the field/fields submitted in the request.

    def patch(self, request, pk=None):
        return Response({"message": "Patch"})

    def delete(self, request, pk=None):
        return Response({"message": "Deleted"})
