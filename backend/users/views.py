from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import CustomUser
from .serializers import CustomUserSerializer


class CustomUserAPIView(APIView):
    permission_classes = (IsAdminUser,)

    @staticmethod
    def patch(request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            pk = int(pk)
        except ValueError:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

        if request.user.id != pk:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        instance = get_object_or_404(CustomUser, pk=pk)

        # Если в запросе есть пароль - хешируем его
        if 'password' in request.data:
            request.data['password'] = make_password(request.data['password'])

        serializer = CustomUserSerializer(instance=instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)