import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getIndividual } from "../graphql/queries";
import Sp02Table from "./OximeterTable";
import Sp02Chart from "./OximeterChart";
import IndividualAvatar from "./IndividualAvatar";

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
});

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
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <Grid
              container
              spacing={3}
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
                  <Typography color="textSecondary">First Name</Typography>
                  <Typography variant="h6">
                    {individualDetail.firstName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">Last Name</Typography>
                  <Typography variant="h6">
                    {" "}
                    {individualDetail.lastName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">Latest SpO2</Typography>
                  <Typography variant="h6">
                    {individualDetail.oximeter.items[0]
                      ? individualDetail.oximeter.items[0].spo2
                      : "Not Available"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    Latest Heart Rate
                  </Typography>
                  <Typography variant="h6">
                    {individualDetail.oximeter.items[0]
                      ? individualDetail.oximeter.items[0].heartRate
                      : "Not Available"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container direction="column" spacing={1}>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h5">Pulse Oximetry History</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClick}
            >
              Add Oximetry
            </Button>
          </Grid>
        </Grid>
        {individualDetail.oximeter &&
        individualDetail.oximeter.items &&
        individualDetail.oximeter.items.length > 0 ? (
          <Grid item xs={11}>
            <Sp02Chart spo2Data={individualDetail.oximeter.items} />
          </Grid>
        ) : null}
        <Grid item xs={11}>
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
