# ******Django******
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns
# ******Local Directories******
from backend.views import ProductsList,CartList,Signup, Login, Logout, SendEmail,CheckCodeMatch, ResetPassword, PaymentProcessing, SendSignUpEmail
urlpatterns = [
    # admin path needs to be on top due to react router issues
    path('admin/', admin.site.urls),
    # Appearance products endpoint
    path("DBProductsAPI/", ProductsList.as_view()),
    # Cart products/ add to cart
    path("CartProducts/", CartList.as_view()),
    # Update product quantity
    path("UpdateProduct/<int:pk>/", CartList.as_view()),
    # Delete product
    path("RemoveProduct/<int:pk>/", CartList.as_view()),
    # Signup endpoint
    path("SignupAPI/", Signup.as_view()),
    # Login endpoint
    path("LoginAPI/", Login.as_view()),
    # Logout endpoint
    path("LogoutAPI/", Logout.as_view()),
    # Send validation email
    path("SendEmail/", SendEmail.as_view()),
    # Confirm the verification code.
    path("ConfirmCode/", CheckCodeMatch.as_view()),
    # Reset Passwords
    path("ResetPassword/", ResetPassword.as_view()),
    # Payment Processing
    path("PaymentProcess/", PaymentProcessing.as_view()),
    # Send Code to Email
    path("EmailCode/", SendSignUpEmail.as_view()),
    # backend application url connection
    path("", include("backend.urls")),
]

urlpatterns = format_suffix_patterns(urlpatterns)