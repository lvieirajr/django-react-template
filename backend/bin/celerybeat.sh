#!/usr/bin/env bash

celery --app=django_react_template.celery:application beat --loglevel=INFO
