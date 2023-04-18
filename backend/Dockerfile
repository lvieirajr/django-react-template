# ======================================================================================
# Base Image
# ======================================================================================
FROM python:3.11-slim as base

# Environment
WORKDIR /app/

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONPATH /app/
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create a new user to avoid using root
RUN addgroup --system {{LOWER_APP_NAME}} && adduser --system --ingroup {{LOWER_APP_NAME}} {{LOWER_APP_NAME}} && chown {{LOWER_APP_NAME}}:{{LOWER_APP_NAME}} ./

# Install general dependencies
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    build-essential \
    libpcre3-dev \
    libpq-dev \
    && apt-get upgrade --no-install-recommends -y \
    && apt-get purge --auto-remove -y -o APT::AutoRemove::RecommendsImportant=false -o APT::AutoRemove::SuggestsImportant=false \
    && apt-get autoremove -y \
    && apt-get clean autoclean \
    && rm -rf /var/lib/{apt,dpkg,cache,log}/ \
    && pip install --upgrade --no-cache-dir pip setuptools poetry \
    && poetry config virtualenvs.create false

# Copy configuration files
COPY --chown={{LOWER_APP_NAME}}:{{LOWER_APP_NAME}} ./pyproject.toml ./poetry.lock* /app/


# ======================================================================================
# Release Image
# ======================================================================================
FROM base as release

# Install only core dependencies
RUN poetry install --no-root --without dev

# Copy the app
COPY --chown={{LOWER_APP_NAME}}:{{LOWER_APP_NAME}} ./ /app/

# Set the default user
USER {{LOWER_APP_NAME}}


# ======================================================================================
# Development Image
# ======================================================================================
FROM base as development

# Install all dependencies
RUN poetry install --no-root

# Copy the app
COPY --chown={{LOWER_APP_NAME}}:{{LOWER_APP_NAME}} ./ /app/

# Set the default user
USER {{LOWER_APP_NAME}}
