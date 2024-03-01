#!/usr/bin/env bash

watchmedo auto-restart -R -d "./" -p "*.py" -- "$@"
