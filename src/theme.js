import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffcf01",
      main: "#fec20e",
      dark: "#fdb913",
      // contrastText: "#fcaf17"
    },
    secondary: {
      light: "#c3c645",
      main: "#b7ba3d",
    },
    error: {
      main: red[500],
    },
  },
});

export default theme;
