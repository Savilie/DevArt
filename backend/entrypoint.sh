cd /app/backend

python3 manage.py --prod migrate --no-input

mkdir "static"

python3 manage.py --prod collectstatic

gunicorn --workers=4 --bind 0.0.0.0:8000 devart.wsgi --prod &

celery -A --prod devart worker --loglevel=info
