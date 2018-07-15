module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: '../drupal/content/',
      },
    },
  ],
  mapping: {
    'ContentJson.fields.field_image': 'ContentJson',
  },
}
