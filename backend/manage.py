#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import argparse  # < - импорт для парсинга кастомных параметров

from django.conf import settings


def main():
    """Run administrative tasks."""

    # Парсим аргументы командной строки
    parser = argparse.ArgumentParser()
    parser.add_argument('--dev', action='store_true', help='Use development settings')
    parser.add_argument('--prod', action='store_true', help='Use production settings')
    args, unknown = parser.parse_known_args()

    # Определяем настройки по умолчанию (можно сделать dev как дефолт)
    default_settings = 'settings.dev'

    if args.prod:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.prod')
    elif args.dev:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')
    else:
        print("You have not specified launch settings, using the default development settings.")
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', default_settings)

    print(f"Using settings module: {os.environ['DJANGO_SETTINGS_MODULE']}")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Передаем оставшиеся аргументы в Django
    execute_from_command_line([sys.argv[0]] + unknown)


if __name__ == '__main__':
    main()
