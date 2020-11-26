import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatRelative } from "date-fns";

import IndividualAvatar from "./IndividualAvatar";
import { URL } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  card: {
    cursor: "pointer",
    height: theme.spacing(40),
  },
  individualName: {
    marginBottom: 10,
  },
}));

const IndividualListItem = ({ individual }) => {
  const history = useHistory();
  const classes = useStyles();

  const getLatestHeartRate = () =>
    individual.pulseOximetry.items[0]
      ? individual.pulseOximetry.items[0].heartRate
      : "Not Available";

  const getLatestSpO2 = () =>
    individual.pulseOximetry.items[0]
      ? individual.pulseOximetry.items[0].spO2
      : "Not Available";

  const getLastUpdated = () =>
    individual.pulseOximetry.items[0]
      ? formatRelative(
          new Date(individual.pulseOximetry.items[0].createdAt),
          new Date()
        )
      : "Not Available";

  return (
    <div className={classes.root}>
      <Card
        elevation={2}
        className={classes.card}
        onClick={() => {
          history.push(URL.INDIVIDUALS + "/" + individual.id);
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={4}
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.profileBackground}
          >
            <Grid item>
              <IndividualAvatar
                individualID={individual.id}
                individualName={individual.firstName}
              />
            </Grid>

            <Grid item container direction="column" alignItems="center">
              <Grid item className={classes.individualName}>
                <Typography variant="h5">
                  {individual.firstName + " " + individual.lastName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Latest SpO2: <b>{getLatestSpO2()}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Latest Heart Rate: <b>{getLatestHeartRate()}</b>
                </Typography>
              </Grid>
              <Grid>
                <Typography color="textSecondary">
                  {"Last updated "}
                  {getLastUpdated()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndividualListItem;
