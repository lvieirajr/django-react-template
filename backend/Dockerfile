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

# Arguments
ARG INSTALL_DEV_DEPENDENCIES=false

# Create a new user to avoid using root
RUN addgroup --system app && adduser --system --ingroup app app && chown app:app ./

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
COPY --chown=app:app ./pyproject.toml ./poetry.lock* /app/

# Install python dependencies
RUN if [ "$INSTALL_DEV_DEPENDENCIES" = true ] ; then poetry install --no-root ; else poetry install --no-root --without dev ; fi

# Copy the app
COPY --chown=app:app ./ /app/

# Set the default user
USER app
