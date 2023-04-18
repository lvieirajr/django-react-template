#!/usr/bin/env sh


watchmedo auto-restart -R -d "./" -p "*.py" -- "$@"
