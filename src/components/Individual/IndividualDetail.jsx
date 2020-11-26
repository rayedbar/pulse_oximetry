import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { Grid, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PulseOximetryWarning from "../PulseOximetry/PulseOximetryWarning";
import IndividualDetailCard from "./IndividualDetailCard";
import PulseOximetryHistory from "../PulseOximetry/PulseOximetryHistory";
import { getIndividualWithPulseOximetryCreatedAtDESC } from "../../graphql/custom-queries";
import { PULSE_OXIMETRY_DEFAULT_RANGE } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const useIndividualDetail = () => {
  const { individualID } = useParams();
  const [individualDetail, setIndividualDetail] = useState(null);

  useEffect(() => {
    const fetchIndividualDetail = async () => {
      try {
        const individualData = await API.graphql(
          graphqlOperation(getIndividualWithPulseOximetryCreatedAtDESC, {
            id: individualID,
          })
        );
        setIndividualDetail(individualData.data.getIndividual);
      } catch (error) {
        console.log("Error Fetching Individual details", error);
      }
    };
    fetchIndividualDetail();
  }, []);

  return individualDetail;
};

const IndividualDetail = () => {
  const classes = useStyles();
  const individualDetail = useIndividualDetail();

  return individualDetail ? (
    <Grid container direction="column" spacing={3} className={classes.root}>
      <PulseOximetryWarning
        latestPulseOximetry={individualDetail.pulseOximetry.items[0]}
        pulseOximetryRange={getPulseOximetryRange(individualDetail)}
      />
      <Grid item>
        <IndividualDetailCard
          individualDetail={individualDetail}
          latestPulseOximetry={individualDetail.pulseOximetry.items[0]}
        />
      </Grid>
      <Grid item>
        <PulseOximetryHistory
          individualID={individualDetail.id}
          pulseOximetryData={individualDetail.pulseOximetry.items}
          pulseOximetryRange={getPulseOximetryRange(individualDetail)}
        />
      </Grid>
    </Grid>
  ) : (
    <LinearProgress />
  );
};

const getPulseOximetryRange = (individualDetail) => {
  if (individualDetail) {
    if (individualDetail.pulseOximetryRange.items[0]) {
      return individualDetail.pulseOximetryRange.items[0];
    } else {
      return {
        id: "default",
        minSpO2: PULSE_OXIMETRY_DEFAULT_RANGE.MIN_SPO2,
        minHeartRate: PULSE_OXIMETRY_DEFAULT_RANGE.MIN_HEART_RATE,
        maxHeartRate: PULSE_OXIMETRY_DEFAULT_RANGE.MAX_HEART_RATE,
      };
    }
  }
};

export default IndividualDetail;
