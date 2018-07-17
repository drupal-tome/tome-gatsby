#!/usr/bin/env bash

cd drupal/web
drush runserver &

cd -

cd gatsby
gatsby develop &

cd -

trap 'kill $(jobs -p)' EXIT

sleep 10

cd drupal/web && drush uli -l 127.0.0.1:8888
open http://127.0.0.1:8000

while true
do
  sleep 1
done
