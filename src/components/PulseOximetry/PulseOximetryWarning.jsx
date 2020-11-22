import React from "react";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { PULSE_OXIMETRY_ALERT_DEFAULT_RANGE as defaultAlertRange } from "../../utils/constants";

const PulseOximetryWarning = ({ latestPulseOximetry, pulseOximetryRange }) => {
  const minSpo2Threshold = pulseOximetryRange
    ? pulseOximetryRange.minSpO2
    : defaultAlertRange.MIN_SPO2;
  const minHeartRateThreshold = pulseOximetryRange
    ? pulseOximetryRange.minHeartRate
    : defaultAlertRange.MIN_HEART_RATE;
  const maxHeartRateThreshold = pulseOximetryRange
    ? pulseOximetryRange.maxHeartRate
    : defaultAlertRange.MAX_HEART_RATE;

  return latestPulseOximetry ? (
    <Grid item container direction="column" spacing={2}>
      {latestPulseOximetry.spo2 < minSpo2Threshold ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>SpO2 Warning</AlertTitle>
            The latest SpO2 suggests a medical issue may be present. Please
            report to Nathan at <strong>203-231-0849</strong>
          </Alert>
        </Grid>
      ) : null}

      {latestPulseOximetry.heartRate < minHeartRateThreshold ||
      latestPulseOximetry.heartRate > maxHeartRateThreshold ? (
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
