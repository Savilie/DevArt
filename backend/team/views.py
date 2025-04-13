from django.shortcuts import get_object_or_404
from rest_framework import status, permissions, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Team
from .serializers import TeamSerializer


class TeamApiView(APIView):

    @staticmethod
    def get(request):

        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @staticmethod
    def post(request):

        if request.user.is_superuser:

            serializer = TeamSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    @staticmethod
    def patch(request, *args, **kwargs):
        if request.user.is_superuser:

            pk = kwargs.get('pk', None)

            if not pk:
                return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

            instance = get_object_or_404(Team, pk=pk)

            serializer = TeamSerializer(instance=instance, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @staticmethod
    def delete(request, *args, **kwargs):

        if request.user.is_superuser:

            pk = kwargs.get('pk', None)

            if not pk:
                return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

            instance = get_object_or_404(Team, pk=pk)

            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
