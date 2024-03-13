#!/usr/bin/env bash

python manage.py collectstatic --clear --no-input --verbosity 0
python manage.py migrate --no-input
