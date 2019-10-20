from rest_framework import serializers
from backend.models import Cart, CartProduct

# class name has to match the model name Seriazliers






class CartProductSerializer(serializers.ModelSerializer):

    class Meta:
        # "model" and "fields"  variable name can't be modified because they are preset or inherited that way
        model = CartProduct
        fields = ["_id", "quantity"]
        # we can use fields = "__all__" to get all fields


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=15)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(max_length=25)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=15)
    password = serializers.CharField(max_length=25)


class LogoutSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=15)
    password = serializers.CharField(max_length=25)
