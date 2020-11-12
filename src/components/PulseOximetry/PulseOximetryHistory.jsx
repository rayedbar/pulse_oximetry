import React from "react";
import { useHistory } from "react-router-dom";
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
  oximetryHeader: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    padding: 20,
  },
  oximetryTitle: {
    marginLeft: 10,
  },
}));

const PulseOximetryHistory = ({ individualID, pulseOximetryData }) => {
  const classes = useStyles();
  const history = useHistory();
  const hasPulseOximetryData = () => pulseOximetryData.length > 0;

  return (
    <Grid container direction="column" spacing={1}>
      <Grid
        item
        container
        justify="space-between"
        className={classes.oximetryHeader}
        alignItems="center"
      >
        <Grid item className={classes.oximetryTitle}>
          <Typography variant="h5">Pulse Oximetry</Typography>
        </Grid>
        <Grid item>
          <IconButton
            title="Add 
          Pulse Oximetry"
            variant="contained"
            onClick={() =>
              history.push(URL.PULSE_OXIMETRY + "/" + individualID)
            }
            color="inherit"
          >
            <AddCircleOutlineIcon className={classes.iconSize} />
          </IconButton>
        </Grid>
      </Grid>
      {hasPulseOximetryData() ? (
        <Grid item xs={11}>
          <PulseOximetryPlot pulseOximetryData={pulseOximetryData} />
        </Grid>
      ) : null}
      <Grid item xs={12}>
        {hasPulseOximetryData() ? (
          <PulseOximetryTable pulseOximetryData={pulseOximetryData} />
        ) : (
          <Typography variant="subtitle2">No Data</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PulseOximetryHistory;
