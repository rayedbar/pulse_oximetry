import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IndividualCard from "../Individual/IndividualCard";
import PulseOximetryWarning from "./PulseOximetryWarning";
import PulseOximetryHistory from "./PulseOximetryHistory";
import ProgressBar from "../Shared/ProgressBar";
import GET_INDIVIDUAL from "../../graphql/Individual/GetIndividual";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const PulseOximetry = () => {
  const classes = useStyles();
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
      <Grid item>
        <PulseOximetryHistory individualDetail={data.getIndividual} />
      </Grid>
    </Grid>
  );
};

export default PulseOximetry;
