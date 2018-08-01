#!/usr/bin/env bash

cd drupal
composer install
drush tome:install

cd -

cd gatsby
yarn install
