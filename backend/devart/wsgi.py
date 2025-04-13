"""
WSGI config for devart project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application

# Определяем среду по аргументу командной строки
is_prod = '--prod' in sys.argv

if is_prod:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.prod')
    # Удаляем аргумент, чтобы не мешал Gunicorn
    sys.argv.remove('--prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')

application = get_wsgi_application()