import React from "react";
import { useHistory } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TuneIcon from "@material-ui/icons/Tune";
import { URL } from "../../utils/constants";

const DrawerItems = ({ toggleDrawer }) => {
  const history = useHistory();

  return (
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
            history.push(URL.INDIVIDUALS + "/add");
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
            history.push(URL.NOTIFY_RECIPIENTS);
          }}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Configure Notifications" />
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
          <ListItemText primary="Set Pulse Oximetry Range" />
        </ListItem>
      </List>
    </div>
  );
};

export default DrawerItems;