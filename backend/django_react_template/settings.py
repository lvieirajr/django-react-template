from pathlib import Path

import environ
import sentry_sdk
import structlog
from sentry_sdk.integrations.celery import CeleryIntegration
from sentry_sdk.integrations.django import DjangoIntegration

from .constants import HOUR
from .types import Environment

# ======================================================================================
# Path
# ======================================================================================
BASE_DIR = Path(__file__).resolve().parent.parent


# ======================================================================================
# Environment
# ======================================================================================
environment = environ.Env()
environment.read_env(BASE_DIR.joinpath(".env"))


# ======================================================================================
# Application
# ======================================================================================
NAME = environment.str("NAME")
VERSION = environment.str("VERSION")

ENVIRONMENT = environment.str("ENVIRONMENT", default=Environment.PRODUCTION).lower()
DEBUG = environment.bool("DEBUG") and ENVIRONMENT != Environment.PRODUCTION

ASGI_APPLICATION = "django_react_template.asgi.application"
WSGI_APPLICATION = "django_react_template.wsgi.application"

ROOT_URLCONF = "django_react_template.urls"

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"

USE_I18N = True
USE_TZ = True


# ======================================================================================
# Security
# ======================================================================================
SECRET_KEY = environment.str("SECRET_KEY")

ALLOWED_HOSTS = environment.list("ALLOWED_HOSTS")

SECURE_CONTENT_TYPE_NOSNIFF = True

SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_SECONDS = 60

SECURE_REFERRER_POLICY = "same-origin"

X_FRAME_OPTIONS = "DENY"

CORS_ALLOWED_ORIGINS = environment.list("ALLOWED_ORIGINS")

PERMISSIONS_POLICY = {
    "accelerometer": [],
    "autoplay": [],
    "camera": [],
    "display-capture": [],
    "encrypted-media": [],
    "fullscreen": [],
    "geolocation": [],
    "gyroscope": [],
    "interest-cohort": [],
    "magnetometer": [],
    "microphone": [],
    "midi": [],
    "payment": [],
    "usb": [],
}


# ======================================================================================
# Apps
# ======================================================================================
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "django_extensions",
    "django_structlog",
    "rest_framework",
    "core",
    "django_react_template",
    "health_check",
    "health_check.db",
    "health_check.cache",
    "health_check.storage",
    "health_check.contrib.migrations",
    "health_check.contrib.redis",
]


# ======================================================================================
# Middleware
# ======================================================================================
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django_permissions_policy.PermissionsPolicyMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django_structlog.middlewares.RequestMiddleware",
]


# ======================================================================================
# Templates & Static
# ======================================================================================
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

STATIC_FILES_DIRS = [BASE_DIR / "templates"]
STATIC_ROOT = BASE_DIR / "staticfiles"
STATIC_URL = "static/"

MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = "media/"


# ======================================================================================
# Databases
# ======================================================================================
DATABASES = {
    "default": {
        **environment.db_url("DATABASE_URL"),
        "ATOMIC_REQUESTS": True,
        "CONN_HEALTH_CHECKS": True,
        "CONN_MAX_AGE": environment.int("DATABASE_CONNECTION_MAX_AGE"),
    },
}


# ======================================================================================
# Caches
# ======================================================================================
REDIS_URL = environment.str("REDIS_URL")

if REDIS_URL:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_URL,
            "TIMEOUT": 1,
            "OPTIONS": {
                "IGNORE_EXCEPTIONS": True,
                "PARSER_CLASS": "redis.connection._HiredisParser",
                "REDIS_CLIENT_KWARGS": {
                    "health_check_interval": 60,
                    "socket_keepalive": True,
                },
                "SOCKET_CONNECT_TIMEOUT": 1,
                "SOCKET_TIMEOUT": 1,
            },
        },
    }
else:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        }
    }


# ======================================================================================
# Logging
# ======================================================================================
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "console": {
            "()": structlog.stdlib.ProcessorFormatter,
            "processor": structlog.dev.ConsoleRenderer(),
        },
        "json": {
            "()": structlog.stdlib.ProcessorFormatter,
            "processor": structlog.processors.JSONRenderer(),
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "console",
        },
        "json": {
            "class": "logging.StreamHandler",
            "formatter": "json",
        },
    },
    "loggers": {
        "django_structlog": {
            "handlers": ["console" if DEBUG else "json"],
            "level": "INFO",
        },
        "django": {
            "handlers": ["console" if DEBUG else "json"],
            "level": "CRITICAL",
            "propagate": False,
        },
        "celery": {
            "handlers": ["console" if DEBUG else "json"],
            "level": "CRITICAL",
            "propagate": False,
        },
    },
}

DJANGO_STRUCTLOG_CELERY_ENABLED = True
DJANGO_STRUCTLOG_COMMAND_LOGGING_ENABLED = True


def configure_structlog():
    processors = [
        structlog.contextvars.merge_contextvars,
        structlog.stdlib.filter_by_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.StackInfoRenderer(),
    ]

    if not DEBUG:
        processors.append(structlog.processors.format_exc_info)

    processors += [
        structlog.processors.UnicodeDecoder(),
        structlog.stdlib.ProcessorFormatter.wrap_for_formatter,
    ]

    structlog.configure(
        processors=processors,
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )


configure_structlog()

# ======================================================================================
# Celery
# ======================================================================================
CELERY_BROKER_URL = REDIS_URL
CELERY_BROKER_CONNECTION_MAX_RETRIES = 3
CELERY_BROKER_TRANSPORT_OPTIONS = {"max_retries": 3}

CELERY_RESULT_BACKEND = None

CELERY_TASK_ALWAYS_EAGER = environment.bool("CELERY_TASK_ALWAYS_EAGER")
CELERY_TASK_SEND_SENT_EVENT = True
CELERY_TASK_TIME_LIMIT = 1 * HOUR
CELERY_TASK_TRACK_STARTED = True

CELERY_WORKER_SEND_TASK_EVENTS = True


# ======================================================================================
# Sentry
# ======================================================================================
if environment.str("SENTRY_DSN"):
    sentry_sdk.init(
        dsn=environment.str("SENTRY_DSN"),
        enable_tracing=True,
        profiles_sample_rate=environment.float("SENTRY_PROFILES_SAMPLE_RATE"),
        traces_sample_rate=environment.float("SENTRY_TRACES_SAMPLE_RATE"),
        integrations=[
            CeleryIntegration(
                propagate_traces=True,
                monitor_beat_tasks=True,
            ),
            DjangoIntegration(
                transaction_style="url",
                middleware_spans=True,
                signals_spans=True,
                cache_spans=True,
            ),
        ],
    )


# ======================================================================================
# Stripe
# ======================================================================================
STRIPE_SECRET_KEY = environment.str("STRIPE_SECRET_KEY")
