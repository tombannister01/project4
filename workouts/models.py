from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.



# ? not sure wether to have user on workouts or workouts on user?
# ! calculating speed in serializers
# ? graph relationships to workouts. many to one? how would model show 
# ? fields to have on graph model?
# * have levels associated with graph for exp?


class MuscleTraining(models.Model):
  name = models.CharField(max_length=50)
  muscles_worked = models.CharField(max_length=100)
  weight = models.IntegerField()
  duration = models.IntegerField(null=True)
  sets = models.IntegerField()
  reps = models.IntegerField()
  speed = models.IntegerField(null=True)
  user = models.ForeignKey(User, related_name='muscle_trainings', on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.name}'

class Cardio(models.Model):
  type = models.CharField(max_length=50)
  duration = models.IntegerField()
  distance = models.IntegerField()
  speed = models.FloatField(null=True)
  user = models.ForeignKey(User, related_name='cardios', on_delete=models.CASCADE)
  def __str__(self):
    return f'{self.type}'


