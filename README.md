# tome-gatsby

[Demo](https://twitter.com/DrupalSAM/status/1018874932959145984)

An example project for using Tome and Gatsby together.

This allows you to use Drupal locally to edit content, and consume that
content with GatsbyJS to generate a static site.

Your Drupal and Gatsby codebases can live together in one repository!

# Requirements

1. PHP 7+
1. [Composer](https://getcomposer.org/download/)
1. [Drush](https://github.com/drush-ops/drush-launcher)
1. [NPM 6+](https://www.npmjs.com/get-npm)
1. The `gatsby` command installed with `npm i -g gatsby-cli@next`.

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

## Why work with Tome's JSON directly?

I decided to use `gatsby-transformer-json` instead of `gatsby-source-drupal`
because it's much faster to read the already exported JSON than use JSON API.
Using the filesystem allows Gatsby to auto-reload when entities change, which
would be quite difficult with an external (albeit local) API.

This also means that you can build Gatsby without running Drupal, which is nice
for splitting up frontend and content editing teams. React experts won't have
to run or connect to Drupal to create Gatsby sites.

## Automatic entity reference support

In `gatsby/gatsby-node.js` there's a lot of crazy code that automatically
creates node fields for entity references, linking content together so you can
write GraphQL queries like:

```
allContentJson {
  edges {
    node {
      fields {
        uid {
          name {
            value
          }
        }
      }
    }
  }
}
```

Which would grab the username from the referenced user entity.

File nodes are also automatically linked for file entities, so if you have a
image field you could process it with a query like:

```
allContentJson {
  edges {
    node {
      fields {
        slug
        field_image {
          fields {
            file {
              childImageSharp {
                fixed(width: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
}
```

Long story short - if you have an entity reference field named field_foo, you
can go straight to the referenced entity with `edges.node.fields.field_foo.*`.
File entities have a special field `file` which links to the Gatsby file node.

# Automatic page generation

`gatsby/gatsby-node.js` will also generate pages for all Content Types. If a
URL alias is set that will be used, otherwise the path is auto-generated in the
format `[type]/[title]`, i.e. `article/my-title`.

This path (known as a slug) will point to a template in `src/templates/[type]`,
which is how `src/templates/article.js` is invoked. To link to a slug, use a
query like:

```
allContentJson {
  edges {
    node {
      fields {
        slug
      }
    }
  }
}
```
