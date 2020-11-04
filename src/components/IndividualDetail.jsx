import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

import { getIndividual } from "../graphql/queries";
import Sp02Table from "./OximeterTable";
import Sp02Chart from "./OximeterChart";
import IndividualAvatar from "./IndividualAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  iconSize: {
    fontSize: 30,
  },
  oximetryHeader: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: 5,
    padding: 20,
  },
  oximetryTitle: {
    marginLeft: 10,
  },
  individualInfo: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const useIndividualDetail = () => {
  const { individualID } = useParams();
  const [individualDetail, setIndividualDetail] = useState(null);

  useEffect(() => {
    async function fetchIndividualDetail() {
      try {
        const individualData = await API.graphql(
          graphqlOperation(getIndividual, { id: individualID })
        );
        setIndividualDetail(individualData.data.getIndividual);
      } catch {
        console.log("Error Fetching Individual details");
      }
    }
    fetchIndividualDetail();
  }, [individualID]);

  return individualDetail;
};

const IndividualDetail = () => {
  const classes = useStyles();
  const history = useHistory();

  const individualDetail = useIndividualDetail();

  const handleClick = () => {
    history.push("/oximetry/" + individualDetail.id);
  };
  return individualDetail ? (
    <Grid container direction="column" spacing={3} className={classes.root}>
      {individualDetail.oximeter.items[0] &&
      individualDetail.oximeter.items[
        individualDetail.oximeter.items.length - 1
      ].spo2 < 96 ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>SpO2 Warning</AlertTitle>
            The latest SpO2 suggests a medical issue may be present. Please
            report to Nathan at <strong>1-954-226-9333</strong>
          </Alert>
        </Grid>
      ) : null}

      {individualDetail.oximeter.items[0] &&
      (individualDetail.oximeter.items[
        individualDetail.oximeter.items.length - 1
      ].heartRate < 60 ||
        individualDetail.oximeter.items[
          individualDetail.oximeter.items.length - 1
        ].heartRate > 100) ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>Heart Rate Warning</AlertTitle>
            The latest Heart Rate suggests a medical issue may be present.
            Please report to Nathan at <strong>1-954-226-9333</strong>
          </Alert>
        </Grid>
      ) : null}
      <Grid item>
        <Card className={classes.card}>
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
                    <Typography color="textSecondary">
                      Latest Heart Rate
                    </Typography>
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
      </Grid>
      <Grid item container direction="column" spacing={1}>
        <Grid
          item
          container
          justify="space-between"
          className={classes.oximetryHeader}
          alignItems="center"
        >
          <Grid item className={classes.oximetryTitle}>
            <Typography variant="h5">Pulse Oximetry</Typography>
          </Grid>
          <Grid item>
            <IconButton
              title="Add Oximetry"
              variant="contained"
              onClick={handleClick}
              color="inherit"
            >
              <AddCircleOutlineIcon className={classes.iconSize} />
            </IconButton>
          </Grid>
        </Grid>
        {individualDetail.oximeter &&
        individualDetail.oximeter.items &&
        individualDetail.oximeter.items.length > 0 ? (
          <Grid item xs={11}>
            <Sp02Chart spo2Data={individualDetail.oximeter.items} />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          {individualDetail.oximeter &&
          individualDetail.oximeter.items &&
          individualDetail.oximeter.items.length > 0 ? (
            <Sp02Table spo2Data={individualDetail.oximeter.items} />
          ) : (
            <Typography variant="subtitle2">No Data</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <LinearProgress />
  );
};

export default IndividualDetail;
