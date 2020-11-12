import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#cfd879",
    },
    avatarBackground: "#e4e4e4",
    button: { main: "#f9dc4e", hover: "#f4d038" },
    secondary: {
      main: "#f4f8a6",
    },
    error: {
      main: red[500],
    },
  },
});

export default theme;
