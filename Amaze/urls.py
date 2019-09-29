# ******Django******
from django.contrib import admin
from django.urls import path, include, re_path
# ******Local Directories******
from backend.views import CategoriesList
from backend.views import Signup, Login, Logout

urlpatterns = [
    # admin path needs to be on top due to react router issues
    path('admin/', admin.site.urls),
    # Appearance products endpoint
    path("DBProductsAPI/", CategoriesList.as_view()),
    # Signup endpoint
    path("SignupAPI/", Signup.as_view()),
    # Login endpoint
    path("LoginAPI/", Login.as_view()),
    # Logout endpoint
    path("LogoutAPI/", Logout.as_view()),
    # backend application url connection
    path("", include("backend.urls")),
]
