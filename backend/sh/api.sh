#!/usr/bin/env sh


uwsgi --ini setup.cfg --http "0.0.0.0:$PORT"
