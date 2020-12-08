import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import ProgressBar from "../Shared/ProgressBar";
import { getPulseOximetryRange } from "../../utils/functions";
import { listAlertRecipients as LIST_ALERT_RECIPIENTS } from "../../graphql/queries";

const PulseOximetryWarning = ({ individual }) => {
  const latestPulseOximetry = individual?.pulseOximetry.items[0];
  const pulseOximetryRange = getPulseOximetryRange(individual);

  const { loading, error, data } = useQuery(gql(LIST_ALERT_RECIPIENTS), {
    variables: { limit: 1 },
  });

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return latestPulseOximetry ? (
    <Grid item container direction="column" spacing={2}>
      {latestPulseOximetry.spO2 < pulseOximetryRange.minSpO2 ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>SpO2 Warning</AlertTitle>
            The latest SpO2 suggests a medical issue may be present. Please
            report to{" "}
            {`${data.listAlertRecipients.items[0].firstName} ${data.listAlertRecipients.items[0].firstName}`}{" "}
            at <strong>{data.listAlertRecipients.items[0].phone}</strong>
          </Alert>
        </Grid>
      ) : null}

      {latestPulseOximetry.heartRate < pulseOximetryRange.minHeartRate ||
      latestPulseOximetry.heartRate > pulseOximetryRange.maxHeartRate ? (
        <Grid item>
          <Alert severity="error">
            <AlertTitle>Heart Rate Warning</AlertTitle>
            The latest Heart Rate suggests a medical issue may be present.Please
            report to{" "}
            {`${data.listAlertRecipients.items[0].firstName} ${data.listAlertRecipients.items[0].firstName}`}{" "}
            at <strong>{data.listAlertRecipients.items[0].phone}</strong>
          </Alert>
        </Grid>
      ) : null}
    </Grid>
  ) : null;
};

export default PulseOximetryWarning;
