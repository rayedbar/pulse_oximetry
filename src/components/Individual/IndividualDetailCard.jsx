import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IndividualAvatar from "./IndividualAvatar";

const useStyles = makeStyles({
  individualInfo: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

const IndividualDetailCard = ({ individualDetail }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={2}
          direction="column"
          justify="space-between"
          alignItems="center"
          className={classes.profileBackground}
        >
          <Grid item>
            <IndividualAvatar
              individualID={individualDetail.id}
              individualName={individualDetail.firstName}
            />
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <div className={classes.individualInfo}>
                <Typography color="textSecondary">First Name</Typography>
                <Typography variant="h6">
                  {individualDetail.firstName}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.individualInfo}>
                <Typography color="textSecondary">Last Name</Typography>
                <Typography variant="h6">
                  {" "}
                  {individualDetail.lastName}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.individualInfo}>
                <Typography color="textSecondary">Latest SpO2</Typography>
                <Typography variant="h6">
                  {individualDetail.oximeter.items[0]
                    ? individualDetail.oximeter.items[
                        individualDetail.oximeter.items.length - 1
                      ].spo2
                    : "Not Available"}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.individualInfo}>
                <Typography color="textSecondary">Latest Heart Rate</Typography>
                <Typography variant="h6">
                  {individualDetail.oximeter.items[0]
                    ? individualDetail.oximeter.items[
                        individualDetail.oximeter.items.length - 1
                      ].heartRate
                    : "Not Available"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IndividualDetailCard;
