import React from "react";
import { Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const OximetryWarning = ({ individualDetail }) => {
  return (
    <Grid item container direction="column" spacing={2}>
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
    </Grid>
  );
};

export default OximetryWarning;
