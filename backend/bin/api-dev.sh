#!/usr/bin/env bash

./migrate.sh
python manage.py runserver 0.0.0.0:8000
