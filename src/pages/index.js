import React, { useState } from "react"
import { graphql } from "gatsby"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Collapse from "@material-ui/core/Collapse"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import DefaultLayout from "../layouts/default"
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
  const [inputError, setInputError] = useState(false)
  const [postsSolved, setPostsSolved] = useState({ 0: true })

  const handleSolvePost = post => {
    if (post.node.frontmatter.password === inputValues[post.node.id]) {
      setPostsSolved(old => ({ ...old, [post.node.frontmatter.level]: true }))
      setInputError(false)
    } else {
      setInputError("Wrooong")
    }
  }

  const handleKeyUpPress = post => event => {
    const { ENTER } = KEY_CODES

    if (event.keyCode === ENTER) {
      handleSolvePost(post)
    }
  }

  const postsListContainer = posts.map((post, i) => {
    const previousSolved = !!postsSolved[post.node.frontmatter.level - 1]

    return (
      <Collapse
        timeout={{ appear: 1000, enter: 1000, exit: 1000 }}
        in={previousSolved}
        key={i}
        unmountOnExit
      >
        <li key={post.node.id}>
          <div className="title">{post.node.frontmatter.title}</div>
          <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
        </li>
        <Box display="flex" justifyContent="center" textAlign="center">
          <Collapse in={!postsSolved[post.node.frontmatter.level]} unmountOnExit>
            <TextField
              size="small"
              label="Lösung"
              value={inputValues[post.node.id] || ""}
              onChange={e => setInputValues(old => ({ ...old, [post.node.id]: e.target.value }))}
              onKeyPress={handleKeyUpPress(post)}
              onKeyUp={handleKeyUpPress(post)}
              error={!!inputError}
              helperText={inputError || ""}
            />

            <Button className="submitButton" onClick={() => handleSolvePost(post)}>
              Abschicken
            </Button>
          </Collapse>
        </Box>
      </Collapse>
    )
  })

  return (
    <DefaultLayout>
      <SEO title="Home" />
      <section>
        <ul>{postsListContainer}</ul>
      </section>
    </DefaultLayout>
  )
}

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

export default IndexPage
