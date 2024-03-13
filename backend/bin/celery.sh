#!/usr/bin/env bash

celery --app=django_react_template.celery:application worker \
  --concurrency="100" \
  --loglevel="INFO" \
  --logfile="/home/app/.celery/%n%I.log" \
  --max-tasks-per-child="100" \
  --pidfile="/home/app/.celery/%n.pid" \
  --pool="gevent" \
  --queues="celery,default" \
  --task-events \
  --without-gossip \
  --without-heartbeat \
  --without-mingle \
  -Ofair
