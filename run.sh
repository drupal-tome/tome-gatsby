#!/usr/bin/env bash

cd drupal/web
drush runserver &

cd -

cd gatsby
gatsby develop &

trap 'kill $(jobs -p)' EXIT

while true
do
  sleep 1
done
