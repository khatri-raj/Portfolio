from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Experience, ContactMessage
from .serializers import ProjectSerializer, ContactMessageSerializer, ExperienceSerializer
from rest_framework.views import APIView
from rest_framework import status

def home(request):
    return render(request,'home.html')

@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

class ContactMessageView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Message sent successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_experiences(request):
    experiences = Experience.objects.all().order_by('-start_date')
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)