import React from "react";
import { useHistory } from "react-router-dom";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TuneIcon from "@material-ui/icons/Tune";
import { URL } from "../../utils/constants";

const Drawer = ({ drawerOpen, toggleDrawer }) => {
  const history = useHistory();

  return (
    <MuiDrawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer(false)}>
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem
            button
            onClick={() => {
              history.push(URL.HOME);
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              history.push(URL.INDIVIDUAL_ADD);
            }}
          >
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Add Individual" />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              history.push(URL.ALERT_RECIPIENTS);
            }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Alert Recipients" />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              history.push(URL.PULSE_OXIMETRY_RANGE);
            }}
          >
            <ListItemIcon>
              <TuneIcon />
            </ListItemIcon>
            <ListItemText primary="Pulse Oximetry Range" />
          </ListItem>
        </List>
      </div>
    </MuiDrawer>
  );
};

export default Drawer;
