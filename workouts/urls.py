from django.urls import path
from .views import ListView, DetailView, ListViewCardio, DetailViewCardio

urlpatterns = [
    path('muscle_training/', ListView.as_view()),
    path('muscle_training/<int:pk>/', DetailView.as_view()),
    path('cardio/', ListViewCardio.as_view()),
    path('cardio/<int:pk>/', DetailViewCardio.as_view()),
    
]