import os
import sys
from celery import Celery

# Определяем среду по аргументу командной строки
is_prod = '--prod' in sys.argv

if is_prod:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.prod')
    # Удаляем аргумент, чтобы не мешал Gunicorn
    sys.argv.remove('--prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')

# Создаем экземпляр Celery
app = Celery('devart')

# Загружаем настройки из файла settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автоматически находим и регистрируем задачи в приложениях Django
app.autodiscover_tasks()
