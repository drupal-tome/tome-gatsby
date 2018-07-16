import React from 'react'
import Layout from '../components/layout'

const ArticlePage = props => {
  return (
    <Layout>
      {props.data.allContentJson.edges.map((article, i) => {
        return (
          <article key={i}>
            <h1>{article.node.title[0].value}</h1>
            <img
              alt={article.node.field_image[0].alt}
              src={article.node.fields.field_image[0].fields.file.publicURL}
            />
            <p dangerouslySetInnerHTML={{ __html: article.node.body[0].value }}></p>
          </article>
        )
      })}
    </Layout>
  )
}

export default ArticlePage

export const query = graphql`
  query($slug: String!) {
    allContentJson(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          title {
            value
          }
          field_image {
            alt
          }
          body {
            value
          }
          fields {
            field_image {
              fields {
                file {
                  publicURL
                }
              }
            }
          }
        }
      }
    }
  }
`
