# ******Django******
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns
# ******Local Directories******
from backend.views import ProductsList,CartList
from backend.views import Signup, Login, Logout

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
    # backend application url connection
    path("", include("backend.urls")),
]

urlpatterns = format_suffix_patterns(urlpatterns)