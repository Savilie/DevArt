from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404

from .tasks import send_email_async
# Create your views here.


class BidAPIView(APIView):

    @staticmethod
    def get(request):
        if request.user.is_superuser:
            bids = Bid.objects.all()
            serializer = BidSerializer(bids, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @staticmethod
    def post(request):
        serializer = BidSerializer(data=request.data)

        if serializer.is_valid():
            # Сохраняем объект, чтобы получить file.url
            bid = serializer.save()

            name = serializer.validated_data.get('name', 'Не указано')
            number = serializer.validated_data.get('number', 'Не указан')
            comment = serializer.validated_data.get('comment', 'Не указан')
            email = serializer.validated_data.get('email', 'Не указан')

            # Формируем абсолютный URL файла, если он есть
            file_url = None
            if bid.file:  # проверяем, есть ли файл
                file_url = request.build_absolute_uri(bid.file.url)

            send_email_async.delay(
                name=name,
                number=number,
                comment=comment,
                email=email,
                file_url=file_url,
            )

            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request, *args, **kwargs):

        if request.user.is_superuser:

            pk = kwargs.get('pk', None)

            if not pk:
                return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)

            instance = get_object_or_404(Bid, pk=pk)

            instance.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
