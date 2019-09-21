from backend.views import index
from django.urls import path, re_path



urlpatterns = [
    # using as_view because it's a class not a function
    # using re_path to catch all django urls
    re_path("", index.as_view())
]
