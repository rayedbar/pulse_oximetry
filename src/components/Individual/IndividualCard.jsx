import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

import IndividualAvatar from "./IndividualAvatar";
import { URL } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  individualInfo: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    float: "right",
  },
  editIconSize: {
    fontSize: 25,
  },
}));

const IndividualCard = ({ individual }) => {
  const classes = useStyles();
  const history = useHistory();

  const { id: individualID, firstName, lastName } = individual;
  const latestPulseOximetry = individual.pulseOximetry?.items[0];

  return (
    <Card>
      <CardContent>
        <IconButton
          title="Edit Information"
          aria-label="Edit Information"
          onClick={() =>
            history.push(`${URL.INDIVIDUAL_EDIT}/${individualID}`, individual)
          }
          className={classes.editButton}
          color="inherit"
          size="small"
        >
          <EditIcon className={classes.editIconSize} />
        </IconButton>
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
              individualID={individualID}
              individualName={firstName}
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
                <Typography variant="h6">{firstName}</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.individualInfo}>
                <Typography color="textSecondary">Last Name</Typography>
                <Typography variant="h6">{lastName}</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.individualInfo}>
                <Typography color="textSecondary">Latest SpO2</Typography>
                <Typography variant="h6">
                  {latestPulseOximetry
                    ? latestPulseOximetry.spO2
                    : "Not Available"}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.individualInfo}>
                <Typography color="textSecondary">Latest Heart Rate</Typography>
                <Typography variant="h6">
                  {latestPulseOximetry
                    ? latestPulseOximetry.heartRate
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

export default IndividualCard;
