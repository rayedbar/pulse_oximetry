import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { Grid, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getIndividual } from "../../graphql/queries";
import PulseOximetryWarning from "../PulseOximetry/PulseOximetryWarning";
import IndividualDetailCard from "./IndividualDetailCard";
import PulseOximetryHistory from "../PulseOximetry/PulseOximetryHistory";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
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

  const { individualDetail, latestPulseOximetry } = useIndividualDetail();

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
      <Grid item>
        <PulseOximetryHistory
          individualID={individualDetail.id}
          pulseOximetryData={individualDetail.oximeter.items}
        />
      </Grid>
    </Grid>
  ) : (
    <LinearProgress />
  );
};

export default IndividualDetail;
