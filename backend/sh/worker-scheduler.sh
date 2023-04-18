#!/usr/bin/env sh


celery --app=app.worker:application beat --loglevel=INFO
