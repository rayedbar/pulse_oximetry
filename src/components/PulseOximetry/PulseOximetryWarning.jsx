import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { getPulseOximetryRange } from "../../utils/functions";
import { URL } from "../../utils/constants";

const PulseOximetryWarning = ({ individual }) => {
  const latestPulseOximetry = individual?.pulseOximetry.items[0];
  const pulseOximetryRange = getPulseOximetryRange(individual);

  return latestPulseOximetry ? (
    <Grid item container direction="column" spacing={2}>
      {latestPulseOximetry.spO2 < pulseOximetryRange.minSpO2 ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>SpO2 Warning</AlertTitle>
            The latest SpO2 suggests a medical issue may be present. Please
            report to <Link to={URL.ALERT_RECIPIENTS}>Alert Recipients</Link>
          </Alert>
        </Grid>
      ) : null}

      {latestPulseOximetry.heartRate < pulseOximetryRange.minHeartRate ||
      latestPulseOximetry.heartRate > pulseOximetryRange.maxHeartRate ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>Heart Rate Warning</AlertTitle>
            The latest Heart Rate suggests a medical issue may be present.Please
            report to <Link to={URL.ALERT_RECIPIENTS}>Alert Recipients</Link>
          </Alert>
        </Grid>
      ) : null}
    </Grid>
  ) : null;
};

export default PulseOximetryWarning;
