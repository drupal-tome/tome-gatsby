module.exports = {
  siteMetadata: {
    title: 'Tome Gatsby Example',
  },
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
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
    'ContentJson.fields.field_tags': 'ContentJson',
    'ContentJson.fields.uid': 'ContentJson',
    'ContentJson.fields.file': 'File',
  },
}
