import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import PulseOximetryTable from "../PulseOximetry/PulseOximetryTable";
import PulseOximetryPlot from "./PulseOximetryPlot";
import { URL } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  iconSize: {
    fontSize: 30,
  },
  pulseOximetryHeader: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    padding: 20,
  },
  pulseOximetryTitle: {
    marginLeft: 10,
  },
}));

const PulseOximetryHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const { individualID } = useParams();

  return (
    <Grid container direction="column" spacing={1}>
      <Grid
        item
        container
        justify="space-between"
        className={classes.pulseOximetryHeader}
        alignItems="center"
      >
        <Grid item className={classes.pulseOximetryTitle}>
          <Typography variant="h5">Pulse Oximetry</Typography>
        </Grid>
        <Grid item>
          <IconButton
            title="Add Pulse Oximetry"
            variant="contained"
            color="inherit"
            onClick={() =>
              history.push(`${URL.PULSE_OXIMETRY_ADD}/${individualID}`)
            }
          >
            <AddCircleOutlineIcon className={classes.iconSize} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={11}>
        <PulseOximetryPlot />
      </Grid>
      <Grid item xs={12}>
        <PulseOximetryTable />
      </Grid>
    </Grid>
  );
};

export default PulseOximetryHistory;
