import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Img from 'gatsby-image'

const IndexPage = props => (
  <Layout>
    {props.data.allContentJson.edges.map((article, i) => {
      return (
        <article key={i} className="home-article">
          <Img
            alt={article.node.field_image[0].alt}
            fixed={
              article.node.fields.field_image[0].fields.file.childImageSharp
                .fixed
            }
            className="home-article__image"
          />
          <div>
            <h2>{article.node.title[0].value}</h2>
            <Link to={article.node.fields.slug}>Read more</Link>
          </div>
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
            slug
            field_image {
              fields {
                file {
                  childImageSharp {
                    fixed(width: 200, height: 200) {
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
  }
`
