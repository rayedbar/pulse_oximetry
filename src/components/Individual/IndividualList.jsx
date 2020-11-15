import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import IndividualListItem from "./IndividualListItem";
import { listIndividualsWithLatestPulseOximetry } from "../../graphql/custom-queries";

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
});

const IndividualList = () => {
  const classes = useStyles();
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    const fetchIndiviuals = async () => {
      try {
        const individualData = await API.graphql(
          graphqlOperation(listIndividualsWithLatestPulseOximetry)
        );
        setIndividuals(individualData.data.listIndividuals.items);
      } catch {
        console.log("Error Fetching Data!");
      }
    };
    fetchIndiviuals();
  }, []);

  return (
    <Grid container direction="row" spacing={2} className={classes.root}>
      {individuals.map((individual) => (
        <Grid item key={individual.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <IndividualListItem individual={individual} />
        </Grid>
      ))}
    </Grid>
  );
};

export default IndividualList;
