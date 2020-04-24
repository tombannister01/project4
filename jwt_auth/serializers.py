from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from workouts.serializers import MuscleTrainingSerializer, CardioSerializer

class PopulateUserSerializer(serializers.ModelSerializer):
  cardios = CardioSerializer(many=True)
  muscle_trainings = MuscleTrainingSerializer(many=True)

  class Meta:
        model = User
        fields = ('username', 'email', 'muscle_trainings', 'cardios')
  

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation', 'muscle_trainings', 'cardios')
        extra_kwargs = {
          'muscle_trainings': {'required': False},
          'cardios': {'required': False}

        }

