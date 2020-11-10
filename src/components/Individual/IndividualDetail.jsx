import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import {
  Typography,
  Grid,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

import { getIndividual } from "../../graphql/queries";
import PulseOximetryTable from "../PulseOximetry/PulseOximetryTable";
import PulseOximetryChart from "../PulseOximetry/PulseOximetryChart";
import PulseOximetryWarning from "../PulseOximetry/PulseOximetryWarning";
import IndividualDetailCard from "./IndividualDetailCard";

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
      <PulseOximetryWarning
        latestPulseOximetry={
          individualDetail.oximeter.items[
            individualDetail.oximeter.items.length - 1
          ]
        }
      />
      <Grid item>
        <IndividualDetailCard individualDetail={individualDetail} />
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
            <PulseOximetryChart
              pulseOximetryData={individualDetail.oximeter.items}
            />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          {individualDetail.oximeter &&
          individualDetail.oximeter.items &&
          individualDetail.oximeter.items.length > 0 ? (
            <PulseOximetryTable
              pulseOximetryData={individualDetail.oximeter.items}
            />
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
