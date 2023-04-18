from pathlib import Path
from sys import stderr
from typing import Any, Dict

from environ import Env
from loguru import logger

# ======================================================================================
# Path
# ======================================================================================
BASE_PATH = Path(__file__).resolve(strict=True).parent.parent

# ======================================================================================
# Env
# ======================================================================================
env = Env()
env.read_env(BASE_PATH.joinpath(".env"))

# ======================================================================================
# Application
# ======================================================================================
APP_NAME = env.str("APP_NAME")

# ======================================================================================
# General settings
# ======================================================================================
DEBUG = env.bool("DEBUG")

ROOT_URLCONF = "app.urls"

ASGI_APPLICATION = "app.asgi.application"
WSGI_APPLICATION = "app.wsgi.application"

# ======================================================================================
# Security
# ======================================================================================
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

SECRET_KEY = env.str("SECRET_KEY")

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = env.list("ALLOWED_ORIGINS")

CSRF_TRUSTED_ORIGINS = env.list("ALLOWED_ORIGINS")
CSRF_COOKIE_DOMAIN = env.str("CSRF_COOKIE_DOMAIN")
CSRF_COOKIE_SECURE = env.bool("CSRF_COOKIE_SECURE")

SESSION_COOKIE_SECURE = env.bool("SESSION_COOKIE_SECURE")


# ======================================================================================
# Apps
# ======================================================================================
INSTALLED_APPS = [
    # Django
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.postgres",
    "django.contrib.sessions",
    # Third party
    "corsheaders",
    "django_extensions",
    "rest_framework",
    # Local
    "app.authentication",
    "app.common",
]

# ======================================================================================
# Middleware
# ======================================================================================
MIDDLEWARE = [
    "app.common.middleware.RequestIDMiddleware",
    "app.common.middleware.LoggingMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ======================================================================================
# Databases
# ======================================================================================
DATABASES = {
    "default": {
        **env.db_url("DATABASE_URL"),
        "ATOMIC_REQUESTS": True,
        "CONN_MAX_AGE": env.int("DATABASE_CONNECTION_MAX_AGE"),
    },
}

# ======================================================================================
# Redis
# ======================================================================================
REDIS_URL = env.str("REDIS_URL")

# ======================================================================================
# Caches
# ======================================================================================
if REDIS_URL:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_URL,
            "TIMEOUT": 1,
            "OPTIONS": {
                "IGNORE_EXCEPTIONS": True,
                "PARSER_CLASS": "redis.connection.HiredisParser",
                "REDIS_CLIENT_KWARGS": {
                    "health_check_interval": 60,
                    "socket_keepalive": True,
                },
                "SOCKET_CONNECT_TIMEOUT": 1,
                "SOCKET_TIMEOUT": 1,
            },
        },
    }

# ======================================================================================
# Authentication
# ======================================================================================
AUTH_USER_MODEL = "authentication.User"

# ======================================================================================
# Internationalization
# ======================================================================================
USE_I18N = True
LANGUAGE_CODE = "en-us"

USE_TZ = True
TIME_ZONE = "UTC"

# ======================================================================================
# Logging
# ======================================================================================
LOGGING_CONFIG = None
LOGGING = {"disable_existing_loggers": True}

logger.add(
    stderr,
    format="{time} | {level} | {message}",
    colorize=DEBUG,
    serialize=True,
)

# ======================================================================================
# Django Rest Framework
# ======================================================================================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "app.common.permissions.RejectAll",
    ],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

# ======================================================================================
# Celery
# ======================================================================================
CELERY_BROKER_URL = REDIS_URL
CELERY_BROKER_CONNECTION_MAX_RETRIES = 3
CELERY_BROKER_TRANSPORT_OPTIONS = {"max_retries": 3}

CELERY_RESULT_BACKEND = REDIS_URL
CELERY_RESULT_BACKEND_MAX_RETRIES = 3
CELERY_RESULT_BACKEND_OPTIONS = {"max_retries": 3}

CELERY_TASK_ALWAYS_EAGER = env.bool("CELERY_TASK_ALWAYS_EAGER")
CELERY_TASK_SEND_SENT_EVENT = True
CELERY_TASK_TIME_LIMIT = 60
CELERY_TASK_TRACK_STARTED = True

CELERY_WORKER_SEND_TASK_EVENTS = True

CELERY_BEAT_SCHEDULE: Dict[str, Dict[str, Any]] = {}


# ======================================================================================
# AWS
# ======================================================================================
AWS_ACCESS_KEY_ID = env.str("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env.str("AWS_SECRET_ACCESS_KEY")

AWS_DEFAULT_REGION = env.str("AWS_DEFAULT_REGION")

AWS_S3_ENDPOINT_URL = env.str("AWS_S3_ENDPOINT_URL")
AWS_S3_BUCKET_NAME = env.str("AWS_S3_BUCKET_NAME")
