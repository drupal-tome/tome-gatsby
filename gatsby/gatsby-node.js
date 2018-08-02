/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

// This callback will automatically create fields for Drupal entity references.
// Because Site nodes are immutable, you'll need to define mappings yourself in
// gatsby-config.js.
//
// For file entities, a link is also added to the File node.
//
// For example, an image field "field_image" would need a mapping like:
//
//   mapping: {
//     'ContentJson.fields.field_image': 'ContentJson',
//     'ContentJson.fields.file': 'File',
//   },
//
// Then you can access image fields in GraphQL like:
// edges {
//   node {
//     title {
//       value
//     }
//     field_image {
//       alt
//     }
//     fields {
//       field_image {
//         fields {
//           file {
//             publicURL
//           }
//         }
//       }
//     }
//   }
// }
exports.onCreateNode = ({ node, actions, getNodes }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'ContentJson' && node.type) {
    let slug
    if (node.path && node.path[0].alias) {
      slug = node.path[0].alias
    } else {
      // Use Pathauto so I don't have to write stuff like this!
      let title = node.title[0].value
      title = title
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9\-]+/g, '')
        .toLowerCase()
      slug = `${node.type[0].target_id}/${title}`
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }

  getNodes()
    .filter(node => node.internal.type === 'ContentJson')
    .forEach(node => {
      Object.keys(node).forEach(field => {
        let references = []
        if (Array.isArray(node[field])) {
          node[field].forEach(value => {
            if (value.target_uuid) {
              const refNode = getNodes()
                .filter(node2 => node2.internal.type === 'ContentJson')
                .find(
                  node2 =>
                    node2.uuid && node2.uuid[0].value === value.target_uuid
                )
              if (refNode) {
                references.push(refNode.id)
              }
            }
          })
        }
        if (references.length) {
          createNodeField({
            node,
            name: field,
            value: references,
          })
        }
      })
      if (node.uri) {
        const relativePath = node.uri[0].value.replace('public://', 'public/')
        const fileNode = getNodes()
          .filter(node2 => node2.internal.type === 'File')
          .find(node2 => node2.relativePath === relativePath)
        if (fileNode) {
          createNodeField({
            node,
            name: 'file',
            value: fileNode.id,
          })
        }
      }
    })
}

// Using an auto-generated slug in exports.onCreateNode, this callback will
// generate a page for every article.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentJson(filter: { fields: { slug: { ne: null } } }) {
          edges {
            node {
              type {
                target_id
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentJson.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(
            `./src/templates/${node.type[0].target_id}.js`
          ),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
