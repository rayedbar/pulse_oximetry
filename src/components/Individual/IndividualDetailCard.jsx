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
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

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

const IndividualDetailCard = ({
  individualID,
  firstName,
  lastName,
  latestPulseOximetry,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleEdit = () => {
    history.push("/individuals/edit/" + individualID);
  };

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
              individualID={individualID}
              individualName={firstName}
            />
          </Grid>
          <Grid item>
            <IconButton
              title="Edit Information"
              variant="contained"
              onClick={handleEdit}
              color="inherit"
            >
              <EditTwoToneIcon className={classes.iconSize} />
            </IconButton>
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
                    ? latestPulseOximetry.spo2
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

export default IndividualDetailCard;
