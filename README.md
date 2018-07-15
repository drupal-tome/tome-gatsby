# tome-gatsby

An example project for using Tome and Gatsby together.

This allows you to use Drupal locally to edit content, and consume that
content with GatsbyJS to generate a static site.

Your Drupal and Gatsby codebases can live together in one repository!

# Requirements

1. PHP 7+
1. [Composer](https://getcomposer.org/download/)
1. [Drush](https://github.com/drush-ops/drush-launcher)
1. [NPM](https://www.npmjs.com/get-npm)

# Installation

To install the project, run:

`./install.sh`

This will install Drupal and Gatsby for you.

# Development

To run development servers for Drupal and Gatsby, run:

`./run.sh`

Drupal will run at `http://127.0.0.1:8888`, and Gatsby will run at
`http://127.0.0.1:8000`.

# Implementation notes

I decided to use `gatsby-transformer-json` instead of `gatsby-source-drupal`
because it's much faster to read the already exported JSON than use JSON API.

This also means that you can build Gatsby without running Drupal, which is nice
for splitting up frontend and content editing teams. React experts won't have
to run or connect to Drupal to create Gatsby sites.
