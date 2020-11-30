import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PulseOximetryWarning from "../PulseOximetry/PulseOximetryWarning";
import IndividualDetailCard from "./IndividualDetailCard";
import PulseOximetryHistory from "../PulseOximetry/PulseOximetryHistory";
import { getIndividualWithPulseOximetryCreatedAtDESC } from "../../graphql/custom-queries";
import ProgressBar from "../Shared/ProgressBar";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const IndividualDetail = () => {
  const classes = useStyles();
  const { individualID } = useParams();
  const { loading, error, data } = useQuery(
    getIndividualWithPulseOximetryCreatedAtDESC,
    {
      variables: { id: individualID },
    }
  );

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container direction="column" spacing={3} className={classes.root}>
      <PulseOximetryWarning individualDetail={data.getIndividual} />
      <Grid item>
        <IndividualDetailCard individualDetail={data.getIndividual} />
      </Grid>
      <Grid item>
        <PulseOximetryHistory individualDetail={data.getIndividual} />
      </Grid>
    </Grid>
  );
};

export default IndividualDetail;
