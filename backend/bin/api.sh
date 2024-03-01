#!/usr/bin/env bash

./migrate.sh
uwsgi --ini setup.cfg --http "0.0.0.0:$PORT"
