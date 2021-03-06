import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../../src/theme"

const TopLayout = props => (
  <React.Fragment>
    <Helmet>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  </React.Fragment>
)

TopLayout.propTypes = {
  children: PropTypes.node,
}

export default TopLayout
