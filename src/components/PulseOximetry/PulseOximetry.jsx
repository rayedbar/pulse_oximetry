import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IndividualCard from "../Individual/IndividualCard";
import PulseOximetryWarning from "./PulseOximetryWarning";
import PulseOximetryTable from "../PulseOximetry/PulseOximetryTable";
import PulseOximetryPlot from "./PulseOximetryPlot";
import ProgressBar from "../Shared/ProgressBar";
import SubHeaderWithAddButton from "../Shared/SubHeaderWithAddButton";
import LIST_PULSE_OXIMETRY_BY_INDIVIDUAL from "../../graphql/PulseOximetry/ListPulseOximetryByIndividual";
import { URL } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const PulseOximetry = () => {
  const classes = useStyles();
  const history = useHistory();
  const { individualID } = useParams();
  const { loading, error, data } = useQuery(LIST_PULSE_OXIMETRY_BY_INDIVIDUAL, {
    variables: { id: individualID },
  });

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  const individual = data.getIndividual;

  return (
    <Grid container direction="column" spacing={3} className={classes.root}>
      <PulseOximetryWarning individual={individual} />
      <Grid item>
        <IndividualCard individual={individual} />
      </Grid>
      <Grid item container direction="column" spacing={1}>
        <Grid item xs={12}>
          <SubHeaderWithAddButton
            title="Pulse Oximetry"
            buttonDescription="Add Pulse Oximetry"
            buttonOnClick={() =>
              history.push(`${URL.PULSE_OXIMETRY_ADD}/${individualID}`)
            }
          />
        </Grid>

        <Grid item xs={11}>
          <PulseOximetryPlot individual={individual} />
        </Grid>
        <Grid item xs={12}>
          <PulseOximetryTable pulseOximetry={individual.pulseOximetry.items} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PulseOximetry;
