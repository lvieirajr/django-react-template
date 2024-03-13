import logging
import os

from celery import Celery
from celery.signals import setup_logging
from django.conf import settings
from django_structlog.celery.steps import DjangoStructLogInitStep

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_react_template.settings")

application = Celery(settings.NAME)

application.config_from_object("django.conf:settings", namespace="CELERY")
application.steps["worker"].add(DjangoStructLogInitStep)

application.autodiscover_tasks()


@setup_logging.connect
def receiver_setup_logging(loglevel, logfile, format, colorize, **kwargs):
    logging.config.dictConfig(settings.LOGGING)
    settings.configure_structlog()
