import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import {
  Typography,
  Grid,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

import { getIndividual } from "../../graphql/queries";
import PulseOximetryTable from "../PulseOximetry/PulseOximetryTable";
import PulseOximetryChart from "../PulseOximetry/PulseOximetryChart";
import PulseOximetryWarning from "../PulseOximetry/PulseOximetryWarning";
import IndividualDetailCard from "./IndividualDetailCard";
import { URL } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  iconSize: {
    fontSize: 30,
  },
  oximetryHeader: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: 5,
    padding: 20,
  },
  oximetryTitle: {
    marginLeft: 10,
  },
}));

const useIndividualDetail = () => {
  const { individualID } = useParams();
  const [individualDetail, setIndividualDetail] = useState(null);
  const [latestPulseOximetry, setLatestPulseOximetry] = useState(null);

  useEffect(() => {
    const fetchIndividualDetail = async () => {
      try {
        const individualData = await API.graphql(
          graphqlOperation(getIndividual, { id: individualID })
        );
        setIndividualDetail(individualData.data.getIndividual);
        setLatestPulseOximetry(
          individualData.data.getIndividual.oximeter.items[
            individualData.data.getIndividual.oximeter.items.length - 1
          ]
        );
      } catch {
        console.log("Error Fetching Individual details");
      }
    };
    fetchIndividualDetail();
  }, [individualID]);

  return { individualDetail, latestPulseOximetry };
};

const IndividualDetail = () => {
  const classes = useStyles();
  const history = useHistory();

  const { individualDetail, latestPulseOximetry } = useIndividualDetail();

  const handleClick = () => {
    history.push(URL.OXIMETRY + "/" + individualDetail.id);
  };

  const hasPulseOximetryData = () => individualDetail.oximeter.items.length > 0;

  return individualDetail ? (
    <Grid container direction="column" spacing={3} className={classes.root}>
      <PulseOximetryWarning latestPulseOximetry={latestPulseOximetry} />
      <Grid item>
        <IndividualDetailCard
          individualID={individualDetail.id}
          firstName={individualDetail.firstName}
          lastName={individualDetail.lastName}
          latestPulseOximetry={latestPulseOximetry}
        />
      </Grid>
      <Grid item container direction="column" spacing={1}>
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
              title="Add Oximetry"
              variant="contained"
              onClick={handleClick}
              color="inherit"
            >
              <AddCircleOutlineIcon className={classes.iconSize} />
            </IconButton>
          </Grid>
        </Grid>
        {hasPulseOximetryData() ? (
          <Grid item xs={11}>
            <PulseOximetryChart
              pulseOximetryData={individualDetail.oximeter.items}
            />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          {hasPulseOximetryData() ? (
            <PulseOximetryTable
              pulseOximetryData={individualDetail.oximeter.items}
            />
          ) : (
            <Typography variant="subtitle2">No Data</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <LinearProgress />
  );
};

export default IndividualDetail;
