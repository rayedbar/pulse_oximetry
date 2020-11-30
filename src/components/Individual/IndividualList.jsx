import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, LinearProgress } from "@material-ui/core";

import IndividualListItem from "./IndividualListItem";
import { listIndividualsWithLatestPulseOximetry } from "../../graphql/custom-queries";

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
});

const IndividualList = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(
    listIndividualsWithLatestPulseOximetry
  );

  if (loading) return <LinearProgress />;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container direction="row" spacing={2} className={classes.root}>
      {data.listIndividuals.items.map((individual) => (
        <Grid item key={individual.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <IndividualListItem individual={individual} />
        </Grid>
      ))}
    </Grid>
  );
};

export default IndividualList;
