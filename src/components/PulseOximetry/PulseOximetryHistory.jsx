import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { URL } from "../../utils/constants";
import SubHeaderWithAddButton from "../Shared/SubHeaderWithAddButton";

const useStyles = makeStyles((theme) => ({
  iconSize: {
    fontSize: 30,
  },
  pulseOximetryHeader: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
  },
  pulseOximetryTitle: {
    marginLeft: 10,
  },
}));

const PulseOximetryHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const { individualID } = useParams();

  return null;
};

export default PulseOximetryHistory;
