#!/usr/bin/env bash

./bin/prepare.sh
uwsgi --ini setup.cfg --http "0.0.0.0:$PORT"
