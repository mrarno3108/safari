import { red } from "@material-ui/core/colors"
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#1e1e1e",
      paper: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
  },
})

export default responsiveFontSizes(theme)
