#!/usr/bin/env bash

celery --app=app.worker:application beat --loglevel=INFO
