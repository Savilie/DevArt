# views.py
import os
from django.http import HttpResponse, Http404, FileResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Case
from .serializers import CaseSerializer


class VideoStreamAPIView(APIView):
    """
    Stream video with support for Range requests (skip/seek in player)
    """

    def get(self, request, pk, format=None):
        try:
            case = Case.objects.get(pk=pk)
        except Case.DoesNotExist:
            return Response({"error": "Video not found"}, status=404)

        path = case.video_file.path

        # Проверка существования файла
        if not os.path.exists(path):
            raise Http404("Video file not found")

        file_size = os.path.getsize(path)
        content_type = 'video/mp4'  # Может потребоваться определение по расширению

        # Обработка Range заголовка
        range_header = request.headers.get('Range', None)

        if range_header:
            # Пример Range: bytes=0-999
            bytes_unit, bytes_range = range_header.split('=')
            bytes_start, bytes_end = bytes_range.split('-')

            bytes_start = int(bytes_start) if bytes_start else 0
            bytes_end = int(bytes_end) if bytes_end else file_size - 1

            # Проверка на корректность диапазона
            if bytes_end < bytes_start:
                bytes_end = bytes_start + 1024 * 1024  # 1MB chunk if invalid

            if bytes_end >= file_size:
                bytes_end = file_size - 1

            length = bytes_end - bytes_start + 1

            # Чтение нужного фрагмента файла
            with open(path, 'rb') as f:
                f.seek(bytes_start)
                data = f.read(length)

            response = HttpResponse(
                data,
                status=206,  # Partial Content
                content_type=content_type
            )
            response['Content-Range'] = f'bytes {bytes_start}-{bytes_end}/{file_size}'
        else:
            # Если Range не указан - отдаём весь файл
            response = FileResponse(open(path, 'rb'), content_type=content_type)

        # Обязательные заголовки
        response['Accept-Ranges'] = 'bytes'
        response['Content-Length'] = str(file_size if not range_header else length)

        # Для CORS (если фронтенд на другом домене)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Expose-Headers'] = 'Content-Range, Content-Length'

        return response


class CaseAPIView(APIView):

    @staticmethod
    def get(request):

        cases = Case.objects.all()
        serializer = CaseSerializer(cases, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @staticmethod
    def post(request):
        if request.user.is_superuser:

            serializer = CaseSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

