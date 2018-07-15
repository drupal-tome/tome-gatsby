/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// This callback will automatically create fields for Drupal entity references.
// Because Site nodes are immutable, you'll need to define mappings yourself in
// gatsby-config.js.
// For example, an image field "field_image" would need a mapping like:
//   mapping: {
//   'ContentJson.fields.field_image': 'ContentJson',
//   },
// Then you can access image fields in GraphQL like:
//   fields {
//     field_image {
//       filename {
//         value
//       }
//     }
//   }
exports.onCreateNode = ({ actions, getNodes }) => {
  const { createNodeField } = actions

  getNodes()
    .filter(node => node.internal.type === 'ContentJson')
    .forEach(node => {
      Object.keys(node).forEach((field) => {
        let references = [];
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
                references.push(refNode.id);
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
    })
}
