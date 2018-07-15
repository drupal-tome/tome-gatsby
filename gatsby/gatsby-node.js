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

  let fields = [];

  getNodes()
    .filter(node => node.internal.type === 'ContentJson')
    .forEach(node => {
      Object.keys(node).forEach((field) => {
        if (node[field].length && node[field][0].target_uuid) {
          const reference = getNodes()
            .filter(node2 => node2.internal.type === 'ContentJson')
            .find(
              node2 =>
              node2.uuid &&
              node2.uuid[0].value === node[field][0].target_uuid
            )

          if (reference) {
            fields.push(field);
            createNodeField({
              node,
              name: field,
              value: [reference.id],
            })
          }
        }
      });
    })

  if (fields.length) {
    getNodes()
      .filter(node => node.internal.type === 'Site')
      .forEach(node => {
        node.mapping = node.mapping || {};
        fields.forEach(field => {
          node.mapping[`ContentJson.fields.${field}`] = 'ContentJson'
        })
      })
  }
}
