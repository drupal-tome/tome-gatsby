import React from 'react'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

const ArticlePage = props => {
  return (
    <Layout>
      {props.data.allContentJson.edges.map((article, i) => {
        return (
          <article key={i}>
            <h1>{article.node.title[0].value}</h1>
            <Img
              alt={article.node.field_image[0].alt}
              fluid={
                article.node.fields.field_image[0].fields.file.childImageSharp
                  .fluid
              }
            />
            <p>
              Created by {article.node.fields.uid[0].name[0].value} on{' '}
              {article.node.created[0].value}
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: article.node.body[0].value }}
            />
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
          created {
            value(formatString: "MMMM Do, YYYY")
          }
          fields {
            field_image {
              fields {
                file {
                  childImageSharp {
                    fluid(maxWidth: 1200, maxHeight: 500) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            uid {
              name {
                value
              }
            }
            field_tags {
              name {
                value
              }
            }
          }
        }
      }
    }
  }
`
