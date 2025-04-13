"""
ASGI config for devart project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
import sys
from django.core.asgi import get_asgi_application

# Определяем среду по аргументу командной строки
is_prod = '--prod' in sys.argv

if is_prod:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.prod')
    # Удаляем аргумент, чтобы не мешал
    sys.argv.remove('--prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')

application = get_asgi_application()
