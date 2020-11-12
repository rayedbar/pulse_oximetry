import React from "react";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const PulseOximetryWarning = ({ latestPulseOximetry }) => {
  return latestPulseOximetry ? (
    <Grid item container direction="column" spacing={2}>
      {latestPulseOximetry.spo2 < 96 ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>SpO2 Warning</AlertTitle>
            The latest SpO2 suggests a medical issue may be present. Please
            report to Nathan at <strong>203-231-0849</strong>
          </Alert>
        </Grid>
      ) : null}

      {latestPulseOximetry.heartRate < 60 ||
      latestPulseOximetry.heartRate > 100 ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>Heart Rate Warning</AlertTitle>
            The latest Heart Rate suggests a medical issue may be present.
            Please report to Nathan at <strong>203-231-0849</strong>
          </Alert>
        </Grid>
      ) : null}
    </Grid>
  ) : null;
};

export default PulseOximetryWarning;
