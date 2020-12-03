import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IndividualCard from "../Individual/IndividualCard";
import PulseOximetryWarning from "./PulseOximetryWarning";
import PulseOximetryHistory from "./PulseOximetryHistory";
import ProgressBar from "../Shared/ProgressBar";
import BuildGetIndividualQuery from "../../graphql/Individual/BuildGetIndividualQuery";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const PulseOximetry = () => {
  const classes = useStyles();
  const { individualID } = useParams();
  const { loading, error, data } = useQuery(
    BuildGetIndividualQuery({
      includeIndividualInfo: true,
      includePulseOximetry: true,
      includePulseOximetryRange: true,
    }),
    {
      variables: { id: individualID, pulseOximetryLimit: 1 },
    }
  );

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container direction="column" spacing={3} className={classes.root}>
      <PulseOximetryWarning individualDetail={data.getIndividual} />
      <Grid item>
        <IndividualCard individualDetail={data.getIndividual} />
      </Grid>
      <Grid item>
        <PulseOximetryHistory />
      </Grid>
    </Grid>
  );
};

export default PulseOximetry;
