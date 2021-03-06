from rest_framework import serializers
from backend.models import Cart, CartProduct,ResetCode

# class name has to match the model name Seriazliers






class CartProductSerializer(serializers.ModelSerializer):

    class Meta:
        # "model" and "fields"  variable name can't be modified because they are preset or inherited that way
        model = CartProduct
        # We will expect all the fields except the cart because that's a foreign key.
        exclude = ['cart']



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


class ResetCodeSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50)
    reset_code = serializers.IntegerField()


class SendEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50)

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(max_length=50)
    confirm_password = serializers.CharField(max_length=50)
    reset_code = serializers.IntegerField()


class PaymentProcessingSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=50)
    amount = serializers.IntegerField()
    email = serializers.CharField(max_length=50)


class SendSignUpEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50)





