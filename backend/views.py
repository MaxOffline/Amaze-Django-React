# ******Local Directories******
from Amaze import settings, credentials
from backend.serializers import CartProductSerializer, SignupSerializer, LoginSerializer, LogoutSerializer,ResetCodeSerializer, SendEmailSerializer, ResetPasswordSerializer, PaymentProcessingSerializer, SendSignUpEmailSerializer
from backend import serializers
from backend.models import Products, Cart, CartProduct
# ******Django******
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.http import Http404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.core import serializers as sers
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
import time
import random
import json
# ******Rest Framework*******
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# ****** Stripe***********
import stripe




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
            query = User.objects.filter(username=serializer.validated_data.get('username')) | User.objects.filter(email  = serializer.validated_data.get('email'))
            if query:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
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

    # Needs to be defined so we can get HTML form option in the API view
    serializer_class = serializers.CartProductSerializer

    def get(self, request):

        if request.user.is_authenticated:
            current_user = User.objects.get(username = request.user.username)
            cart = Cart.objects.get(user = request.user.id)
            cart_products = cart.cartproduct_set.all()
            cart_products = sers.serialize("json", cart_products)
            return Response({cart_products})
        return Response("Error", status=status.HTTP_400_BAD_REQUEST)




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



# This Send Email is only for the forgot password form.
class SendEmail(APIView):
    
    # Needs to be defined so we can get HTML form option in the API view
    serializer_class = serializers.SendEmailSerializer

    # Send code.
    def post(self, request):
        serializer = SendEmailSerializer(data=request.data)
        if serializer.is_valid():
            try:
                email=serializer.validated_data.get('email')
                found_user = User.objects.get(email=email)
                reset_model = found_user.resetcode_set.get(user = found_user.pk)
                reset_code = str(reset_model.reset_code)
                send_mail(
                    'Amaze verification code.',
                    reset_code,
                    settings.EMAIL_HOST_USER,
                    [email],
                    fail_silently=True,
                )
                return Response("Email Exists", status = status.HTTP_200_OK)
                # reset_code = sers.serialize("json", reset_model.reset_code)
                # return Response({reset_code})

            except:
                return Response("Email provided does not exist.", status=status.HTTP_400_BAD_REQUEST)

    # Change code after 30 minutes.
    def put(self, request):
        time.sleep(1800)
        serializer = SendEmailSerializer(data=request.data)
        if serializer.is_valid():
            try:
                email=serializer.validated_data.get('email')
                found_user = User.objects.get(email=email)
                reset_model = found_user.resetcode_set.get(user = found_user.pk)
                reset_model.reset_code = random.randint(100000, 1000000)
                reset_model.save()
                return Response({"Timer started"}, status = status.HTTP_200_OK)
            except:
                return Response("Error", status=status.HTTP_400_BAD_REQUEST)



class CheckCodeMatch(APIView):
    
    # Needs to be defined so we can get HTML form option in the API view
    serializer_class = serializers.ResetCodeSerializer

    def post(self, request):
        serializer = ResetCodeSerializer(data=request.data)
        if serializer.is_valid():
            try:
                email=serializer.validated_data.get('email')
                reset_code=serializer.validated_data.get('reset_code')
                found_user = User.objects.get(email=email)
                reset_model = found_user.resetcode_set.get(user=found_user.pk)
                existing_code = reset_model.reset_code
                if existing_code == reset_code:
                    return Response("Code Matched", status = status.HTTP_200_OK)
                # reset_code = sers.serialize("json", reset_model.reset_code)
                # return Response({reset_code})

            except:
                return Response("Code Is Incorrect.", status=status.HTTP_400_BAD_REQUEST)

class ResetPassword(APIView):
    
    # Needs to be defined so we can get HTML form option in the API view
    serializer_class = serializers.ResetPasswordSerializer

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                email=serializer.validated_data.get('email')
                reset_code=serializer.validated_data.get('reset_code')
                password=serializer.validated_data.get('password')
                confirm_password=serializer.validated_data.get('confirm_password')
                found_user = User.objects.get(email=email)
                reset_model = found_user.resetcode_set.get(user=found_user.pk)
                existing_code = reset_model.reset_code
                if existing_code == reset_code:
                    found_user.set_password(password)
                    reset_model.reset_code = random.randint(100000, 1000000)
                    found_user.save()
                    reset_model.save()
                return Response("Password has been reset.", status = status.HTTP_200_OK)
            except:
                return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)
        return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)



class PaymentProcessing(APIView):

    serializer_class = serializers.PaymentProcessingSerializer
    def post(self, request):
        serializer = PaymentProcessingSerializer(data=request.data)
        if serializer.is_valid():
            stripe.api_key = credentials.STRIP_API_KEY
            token = serializer.validated_data.get("token")
            amount = serializer.validated_data.get("amount")
            charge = stripe.Charge.create(
            amount=amount*100,
            currency='usd',
            receipt_email='cbv.python@gmail.com',
            description='Example charge',
            source=token,
            )
            return Response(charge, status = status.HTTP_200_OK)
            




class SendSignUpEmail(APIView):
    
    # Needs to be defined so we can get HTML form option in the API view
    serializer_class = serializers.SendSignUpEmailSerializer

    # Send code.
    def post(self, request):
        serializer = SendSignUpEmailSerializer(data=request.data)
        if serializer.is_valid():
            try:
                email=serializer.validated_data.get('email')
                email_code = random.randint(100000, 1000000)
                send_mail(
                    'Amaze verification code.',
                    str(email_code),
                    settings.EMAIL_HOST_USER,
                    [email],
                    fail_silently=True,
                )
                return Response({email_code}, status = status.HTTP_200_OK)

            except :
                return Response("Email provided does not exist.", status=status.HTTP_400_BAD_REQUEST)