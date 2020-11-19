import React from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AppBar, Toolbar, IconButton, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { URL } from "../utils/constants";
import SideBarItems from "./shared/SideBarItems";

const useStyles = makeStyles((theme) => ({
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
    marginRight: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

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

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer(false)}>
          <SideBarItems toggleDrawer={toggleDrawer} />
        </Drawer>
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          className={classes.logo}
          onClick={() => history.push(URL.HOME)}
          alt="HSBT Logo"
        />
        <div className={classes.grow} />
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
