import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

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
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: "1.1rem",
        marginBottom: 50,
        "&$focused": {
          color: grey[700],
        },
      },
    },
    MuiInputBase: {
      root: {
        fontSize: "1.2rem",
      },
    },
    MuiTextField: {
      root: {
        marginBottom: "0.3rem",
      },
    },
  },
});

export default theme;
