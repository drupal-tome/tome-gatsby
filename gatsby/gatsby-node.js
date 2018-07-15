/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

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
exports.onCreateNode = ({ actions, getNodes }) => {
  const { createNodeField } = actions

  getNodes()
    .filter(node => node.internal.type === 'ContentJson')
    .forEach(node => {
      Object.keys(node).forEach((field) => {
        if (!node.fields || !node.fields[field]) {
          let references = []
          if (Array.isArray(node[field])) {
            node[field].forEach((value) => {
              if (value.target_uuid) {
                const refNode = getNodes()
                  .filter(node2 => node2.internal.type === 'ContentJson')
                  .find(
                    node2 =>
                    node2.uuid &&
                    node2.uuid[0].value === value.target_uuid
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
        }
      })
      if (node.uri && (!node.fields || !node.fields.file)) {
        const absolutePath = node.uri[0].value.replace('public://', '../drupal/files/public/')
        const fileNode = getNodes()
          .filter(node2 => node2.internal.type === 'File')
          .find(node2 => node2.absolutePath === absolutePath)
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
