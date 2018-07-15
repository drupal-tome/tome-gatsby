import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = (props) => (
  <Layout>
    {JSON.stringify(props.data.allContentJson)}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allContentJson(filter: {
      type: {
        elemMatch: {
          target_id: { eq: "article" },
        }
      }
    }) {
      edges {
        node {
          title {
            value
          }
          fields {
            field_image {
              filename {
                value
              }
            }
          }
        }
      }
    }
  }
`
