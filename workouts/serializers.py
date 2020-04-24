from rest_framework import serializers
# from .jwt_auth.serializers import UserSerializer
from .models import MuscleTraining, Cardio

class MuscleTrainingSerializer(serializers.ModelSerializer):
  class Meta:
    fields = ('id', 'name','muscles_worked', 'weight','duration', 'sets', 'reps', 'user')
    model = MuscleTraining

class CardioSerializer(serializers.ModelSerializer):
  class Meta:
    fields = ('id', 'type', 'duration', 'distance', 'user', 'speed')
    model = Cardio

# class PopulateCardioSerializer(CardioSerializer):
#   user = UserSerializer()
#   class Meta: 
#     model = Cardio
#     fields = ('id', 'type', 'duration', 'distance', 'user', 'speed')
