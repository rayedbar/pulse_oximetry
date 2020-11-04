import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import IndividualListItem from "./IndividualListItem";

const listIndividualsQuery = `query listIndividualsQuery {
  listIndividuals {
    items {
      id
      firstName
      lastName
      oximeter(limit: 1, sortDirection: DESC) {
        items {
          id
          createdAt
          spo2
          heartRate
        }
      }
    }
  }
}`;

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
});

const IndividualList = () => {
  const classes = useStyles();
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    async function fetchIndiviuals() {
      try {
        const individualData = await API.graphql(
          graphqlOperation(listIndividualsQuery)
        );
        setIndividuals(individualData.data.listIndividuals.items);
      } catch {
        console.log("Error Fetching Data!");
      }
    }
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
