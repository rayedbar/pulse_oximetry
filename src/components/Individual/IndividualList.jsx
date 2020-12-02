import React from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import IndividualListItem from "./IndividualListItem";
import ProgressBar from "../Shared/ProgressBar";
import GET_INDIVIDUALS from "../../graphql/Individual/GetIndividuals";

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
});

const IndividualList = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_INDIVIDUALS);

  if (loading) return <ProgressBar />;
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
