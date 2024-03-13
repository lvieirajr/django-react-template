# ======================================================================================
# Base Image
# ======================================================================================
FROM python:3.12-slim as base

# Environment
ARG ENVIRONMENT=production

WORKDIR /app/

ENV DEBIAN_FRONTEND="noninteractive"
ENV POETRY_CONFIG_DIR="/home/app/.config/pypoetry/"
ENV PYTHONPATH="/app/"
ENV PYTHONUNBUFFERED=1

# OS dependencies & configuration
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    build-essential \
    ca-certificates \
    libpcre3-dev \
    libpq-dev \
    openssl \
    && apt-get upgrade --no-install-recommends -y \
    && apt-get purge --auto-remove -y -o APT::AutoRemove::RecommendsImportant=false -o APT::AutoRemove::SuggestsImportant=false \
    && apt-get autoremove -y \
    && apt-get clean autoclean \
    && rm -rf /var/lib/{apt,dpkg,cache,log}/ \
    && pip install --no-cache-dir --upgrade pip poetry \
    && poetry config virtualenvs.create false \
    && adduser --system --group --home /home/app/ app \
    && mkdir /home/app/.celery/ /home/app/.uwsgi/ \
    && chown -R app:app /usr/local/ /home/app/ /app/

# User
USER app

# Application configuration files
COPY --chown=app:app ./pyproject.toml ./poetry.lock* /app/

# Python dependencies
RUN if [ "$ENVIRONMENT" = "development" ] || [ "$ENVIRONMENT" = "test" ] || [ "$ENVIRONMENT" = "ci" ] ; \
    then poetry install --no-ansi --no-cache --no-interaction --no-root --only main,dev ; \
    else poetry install --no-ansi --no-cache --no-interaction --no-root --only main ; fi

# Application code
COPY --chown=app:app ./ /app/
