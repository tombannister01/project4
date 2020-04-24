from django.db import models
from django.contrib.auth.models import AbstractUser
from django.apps import apps
# MuscleTraining = apps.get_model('workouts', 'MuscleTraining')
# Cardio = apps.get_model('workouts', 'Cardio')
# from workouts.models import MuscleTraining
# from workouts.models import Cardio

# Create your models here.

class User(AbstractUser):
    
  image = models.CharField(max_length=200)
  level = models.IntegerField(default=0)
 
