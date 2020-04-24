from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import MuscleTraining, Cardio
from .serializers import MuscleTrainingSerializer, CardioSerializer 
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY
# Create your views here.

class ListView(APIView): 
  # serializer_class = MuscleTrainingSerializer
  # queryset = MuscleTraining.objects.all()
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        request.data['user'] = request.user.id
        muscle_training = MuscleTrainingSerializer(data=request.data)
        if muscle_training.is_valid():
            muscle_training.save()
            return Response(muscle_training.data, status=HTTP_201_CREATED)
        return Response(muscle_training.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class DetailView(RetrieveUpdateDestroyAPIView): 
  serializer_class = MuscleTrainingSerializer
  queryset = MuscleTraining.objects.all()



class ListViewCardio(APIView): 
  # serializer_class = CardioSerializer
  # queryset = Cardio.objects.all()
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        request.data['user'] = request.user.id
        cardio = CardioSerializer(data=request.data)
        if cardio.is_valid():
            cardio.save()
            return Response(cardio.data, status=HTTP_201_CREATED)
        return Response(cardio.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class DetailViewCardio(RetrieveUpdateDestroyAPIView): 
  serializer_class = CardioSerializer
  queryset = Cardio.objects.all()


 