#!/usr/bin/env bash

cd drupal/web
drush runserver &

sleep 1

drush uli -l 127.0.0.1:8888

cd -

cd gatsby
gatsby develop &

cd -

trap 'kill $(jobs -p)' EXIT

while true
do
  sleep 1
done
