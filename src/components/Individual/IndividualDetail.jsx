import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { Grid, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PulseOximetryWarning from "../PulseOximetry/PulseOximetryWarning";
import IndividualDetailCard from "./IndividualDetailCard";
import PulseOximetryHistory from "../PulseOximetry/PulseOximetryHistory";
import { getIndividualWithPulseOximetryCreatedAtDESC } from "../../graphql/custom-queries";

const useStyles = makeStyles(() => ({
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
          graphqlOperation(getIndividualWithPulseOximetryCreatedAtDESC, {
            id: individualID,
          })
        );
        setIndividualDetail(individualData.data.getIndividual);
        setLatestPulseOximetry(
          individualData.data.getIndividual.oximeter.items[0]
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
      <PulseOximetryWarning
        latestPulseOximetry={latestPulseOximetry}
        pulseOximetryRange={individualDetail.pulseOximetryRange.items[0]}
      />
      <Grid item>
        <IndividualDetailCard
          individualDetail={individualDetail}
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
