from os import environ

from celery import Celery
from django.conf import settings

environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

application = Celery(settings.APP_NAME)
application.config_from_object("django.conf:settings", namespace="CELERY")
application.autodiscover_tasks()
