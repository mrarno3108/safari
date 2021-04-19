import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import DefaultLayout from "../layouts/default"
import Image from "../components/image"
import SEO from "../components/seo"

import "../styles/pages.scss"

const KEY_CODES = {
  ENTER: 13,
}

const IndexPage = ({ data }) => {
  // all phandleKeyUpPressosts without dates are assumed to be drafts or pages
  // not to be added to postsList
  const posts = data.allMarkdownRemark.edges

  const [inputValues, setInputValues] = useState({})
  const [postsSolved, setPostsSolved] = useState({ 0: true })

  const handleSolvePost = post => {
    if (post.node.frontmatter.password === inputValues[post.node.id]) {
      setPostsSolved(old => ({ ...old, [post.node.frontmatter.level]: true }))
    }
  }

  const handleKeyUpPress = post => event => {
    const { ENTER } = KEY_CODES

    if (event.keyCode === ENTER) {
      handleSolvePost(post)
    }
  }

  const postsListContainer = posts.map((post, i) => (
    <div
      key={i}
      className={
        console.log({ post, postsSolved, solved: postsSolved[post.node.frontmatter.level - 1] }) ||
        postsSolved[post.node.frontmatter.level - 1]
          ? "uncollapsedPost"
          : "collapsedPost"
      }
    >
      <li key={post.node.id}>
        <div className="title">{post.node.frontmatter.title}</div>
        <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
      </li>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {postsSolved[post.node.frontmatter.level] ? (
          <div>SOLVED</div>
        ) : (
          <input
            type="text"
            value={inputValues[post.node.id] || ""}
            onChange={e => setInputValues(old => ({ ...old, [post.node.id]: e.target.value }))}
            onKeyPress={handleKeyUpPress(post)}
            onKeyUp={handleKeyUpPress(post)}
          />
        )}
        {!postsSolved[post.node.frontmatter.level] && (
          <div className="submitButton" onClick={() => handleSolvePost(post)}>
            Submit
          </div>
        )}
      </div>
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
    allMarkdownRemark(sort: { fields: frontmatter___level, order: ASC }) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            password
            level
          }
        }
      }
    }
  }
`
