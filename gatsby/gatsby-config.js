module.exports = {
  siteMetadata: {
    title: 'Tome Gatsby Example',
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: '../drupal/files/',
      },
    },
  ],
  mapping: {
    'ContentJson.fields.field_image': 'ContentJson',
    'ContentJson.fields.file': 'File',
  },
}
