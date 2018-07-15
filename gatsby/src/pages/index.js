import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = props => (
  <Layout>
    {props.data.allContentJson.edges.map((article, i) => {
      return (
        <article key={i}>
          <img
            alt={article.node.field_image[0].alt}
            src={article.node.fields.field_image[0].fields.file.publicURL}
          />
          <h2>{article.node.title[0].value}</h2>
          <Link to="/article/foo">Read more</Link>
        </article>
      )
    })}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allContentJson(
      filter: { type: { elemMatch: { target_id: { eq: "article" } } } }
    ) {
      edges {
        node {
          title {
            value
          }
          field_image {
            alt
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
