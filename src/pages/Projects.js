import React from 'react'
import Layout from '../components/layout'
import get from 'lodash/get'
import { graphql } from 'gatsby'
class Projects extends React.Component {
  render() {
    const data = get(this, 'props.data')
    return(
      <Layout data={data} location={this.props.location}>
        <h1>Projects</h1>
      </Layout>
    )
  }
}

export default Projects

export const pageQuery = graphql`
  query ProjectsQuery {
    site {
      siteMetadata {
        title
        links {
          logo
          url
          title
        }
      }
    }
    Logo: file(relativePath: {eq: "digitalredz.png"}) {
      childImageSharp {
        sizes(maxWidth: 340 ) {
          ...GatsbyImageSharpSizes_noBase64
        }
      }
    }
    Links: allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`