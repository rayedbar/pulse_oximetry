import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IndividualCard from "../Individual/IndividualCard";
import PulseOximetryWarning from "./PulseOximetryWarning";
import PulseOximetryTable from "../PulseOximetry/PulseOximetryTable";
import PulseOximetryPlot from "./PulseOximetryPlot";
import ProgressBar from "../Shared/ProgressBar";
import SubHeaderWithAddButton from "../Shared/SubHeaderWithAddButton";
import { URL } from "../../utils/constants";

const GET_INDIVIDUAL = gql`
  query GetIndividual(
    $id: ID!
    $pulseOximetryLimit: Int
    $pulseOximetryRangeLimit: Int = 1
  ) {
    getIndividual(id: $id) {
      id
      firstName
      lastName
      gender
      dob
      pulseOximetry(limit: $pulseOximetryLimit, sortDirection: DESC) {
        items {
          id
          spO2
          heartRate
          createdAt
          range
        }
      }
      pulseOximetryRange(limit: $pulseOximetryRangeLimit, sortDirection: DESC) {
        items {
          id
          minSpO2
          minHeartRate
          maxHeartRate
        }
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const PulseOximetry = () => {
  const classes = useStyles();
  const history = useHistory();
  const { individualID } = useParams();
  const { loading, error, data } = useQuery(GET_INDIVIDUAL, {
    variables: { id: individualID },
  });

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container direction="column" spacing={3} className={classes.root}>
      <PulseOximetryWarning individualDetail={data.getIndividual} />
      <Grid item>
        <IndividualCard individualDetail={data.getIndividual} />
      </Grid>
      <Grid item container direction="column" spacing={1}>
        <Grid item xs={12}>
          <SubHeaderWithAddButton
            title="Pulse Oximetry"
            buttonDescription="Add Pulse Oximetry"
            buttonOnClick={() =>
              history.push(`${URL.PULSE_OXIMETRY_ADD}/${individualID}`)
            }
          />
        </Grid>

        <Grid item xs={11}>
          <PulseOximetryPlot individualDetail={data.getIndividual} />
        </Grid>
        <Grid item xs={12}>
          <PulseOximetryTable
            pulseOximetryData={data.getIndividual.pulseOximetry.items}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PulseOximetry;
