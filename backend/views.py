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
from backend.serializers import CartProductSerializer, SignupSerializer, LoginSerializer, LogoutSerializer
from backend import serializers
from django.core import serializers as sers
from backend.models import Products, Cart, CartProduct
import json


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
                user.cart_set.create(user = request.user.username)
                user.save()
                user = authenticate(
                    username=serializer.validated_data.get('username'),
                    password=serializer.validated_data.get('password')
                    )
                login(request, user)
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

class ProductsList(APIView):

    def get(self, request, format = None):
        products = Products.objects.filter(active = True)
        products = sers.serialize("json", products)
        user_authenticated = False
        if request.user.is_authenticated:
            user_authenticated = True
        return Response([products, user_authenticated] )

""" Cart Section """
class CartList(APIView):


    def get(self, request):

        if request.user.is_authenticated:
            current_user = User.objects.get(username = request.user.username)
            cart = Cart.objects.get(user = request.user.id)
            cart_products = cart.cartproduct_set.all()
            cart_products = sers.serialize("json", cart_products)
            return Response({cart_products})
        return Response("Error", status=status.HTTP_400_BAD_REQUEST)

            # Needs to be defined so we can get HTML form option in the API view
    serializer_class = serializers.CartProductSerializer


    def post(self, request):
        """serializer will accept the data input and push it back to
            the CategoriesSerializer in serializers.py """
        serializer = CartProductSerializer(data=request.data)

        """is_valid() will run validation on the model fields attributes as specified
            in models.py """
        if serializer.is_valid():
            if (request.user.is_authenticated):
                current_user = User.objects.get(username = request.user.username)
                cart = Cart.objects.get(user = request.user.id)
                try:
                    incoming_quantity = serializer.validated_data.get('quantity')
                    get_product = cart.cartproduct_set.get(
                        product_id=serializer.validated_data.get('product_id')
                        )
                    if (get_product.quantity + incoming_quantity) > 10:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    get_product.quantity += serializer.validated_data.get('quantity')
                    get_product.save()
                    return Response("allow", status = status.HTTP_200_OK)                    
                except:

                    createProduct = cart.cartproduct_set.create(
                        product_id=serializer.validated_data.get('product_id'),
                        newarrival=serializer.validated_data.get('newarrival'),
                        liked=serializer.validated_data.get('liked'),
                        active=serializer.validated_data.get('active'),
                        featured=serializer.validated_data.get('featured'),
                        title=serializer.validated_data.get('title'),
                        category=serializer.validated_data.get('category'),
                        price=serializer.validated_data.get('price'),
                        imgUrl=serializer.validated_data.get('imgUrl'),
                        quantity=serializer.validated_data.get('quantity'))
                    return Response("allow", status = status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Replace the whole object with every field with the new input in the request
    def put(self, request, pk):
        serializer = CartProductSerializer(data=request.data)
        # print(serializer.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                # current_user = User.objects.get(username = request.user.username)
                cart = Cart.objects.get(user = request.user.id)
                get_product = cart.cartproduct_set.get(product_id=pk)
                get_product.quantity = serializer.validated_data.get('quantity')
                get_product.save()
                return Response({"message": "Updated"},status = status.HTTP_200_OK)



    # Update only the field/fields submitted in the request.
    def patch(self, request, pk=None):
        return Response({"message": "Patch"})

    def delete(self, request, pk):

        if request.user.is_authenticated:
            # current_user = User.objects.get(username = request.user.username)
            cart = Cart.objects.get(user = request.user.id)
            try:
                get_product = cart.cartproduct_set.get(product_id=pk).delete()
                return Response({"message": "Deleted"})
            except CartProduct.DoesNotExist:
                return Response("DoesNotExist", status = status.HTTP_200_OK)
            else:
                return Response({"another freagging error"}, status=status.HTTP_400_BAD_REQUEST)









