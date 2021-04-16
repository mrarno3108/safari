import React from "react"
import { Link, graphql } from "gatsby"

import DefaultLayout from "../layouts/default"
import Image from "../components/image"
import SEO from "../components/seo"

import { groupBy, getDateYear } from "../utils"

const IndexPage = ({ data }) => {
  // all posts without dates are assumed to be drafts or pages
  // not to be added to postsList
  const posts = data.allMarkdownRemark.edges

  const postsListContainer = posts.map((post, i) => (
    <div key={i}>
      <li key={post.node.id}>
        <div className="title">{post.node.frontmatter.title}</div>
        <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
      </li>
    </div>
  ))
  return (
    <DefaultLayout>
      <SEO title="Home" />
      <section>
        <ul>{postsListContainer}</ul>
      </section>
    </DefaultLayout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
