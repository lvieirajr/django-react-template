#!/usr/bin/env sh


celery --app=app.worker:application worker \
  --queues="celery" \
  --pool=prefork \
  --autoscale=20,4 \
  --max-tasks-per-child=1000 \
  --loglevel=INFO \
  --without-gossip \
  --without-mingle \
  --without-heartbeat \
  --task-events
