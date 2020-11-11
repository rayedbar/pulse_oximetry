import React from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { URL } from "../utils/constants";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  logo: {
    cursor: "pointer",
  },
  iconSize: {
    fontSize: 30,
  },
  addIndividualButton: {
    marginRight: 20,
  },
});

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      history.push("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <img
          src={process.env.PUBLIC_URL + "/navbar.png"}
          className={classes.logo}
          onClick={() => history.push(URL.HOME)}
          alt="Therap Logo"
        />
        <div className={classes.grow} />
        <IconButton
          title="Add Individual"
          variant="contained"
          onClick={() => history.push(URL.INDIVIDUALS + "/add")}
          color="inherit"
          className={classes.addIndividualButton}
        >
          <AddCircleOutlineIcon className={classes.iconSize} />
        </IconButton>
        <IconButton
          title="Sign Out"
          variant="contained"
          onClick={handleSignOut}
          color="inherit"
        >
          <ExitToAppIcon className={classes.iconSize} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
