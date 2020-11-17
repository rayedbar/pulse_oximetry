import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@material-ui/core";

import { createOximeter as createPulseOximetryMutation } from "../../graphql/mutations";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import {
  SPO2_VALIDATION_ERROR,
  HEART_RATE_VALIDATION_ERROR,
} from "../../utils/constants";
import ConfirmationDialog from "../shared/ConfirmationDialog";

const PulseOximetryForm = () => {
  const history = useHistory();
  const { individualID } = useParams();
  const { register, errors, handleSubmit } = useForm();

  const [pulseOximetryData, setPulseOximetryData] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = (data) => {
    setPulseOximetryData(data);
    setShowDialog(true);
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    savePulseOximetry();
  };

  const savePulseOximetry = async () => {
    try {
      await API.graphql(
        graphqlOperation(createPulseOximetryMutation, {
          input: {
            individualID: individualID,
            heartRate: parseInt(pulseOximetryData.heartRate, 10),
            spo2: parseInt(pulseOximetryData.spo2, 10),
          },
        })
      );
      history.goBack();
    } catch {
      console.log("Error adding oximeter reading");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item>
          <Typography variant="h4">Pulse Oximetry</Typography>
        </Grid>
        <Grid item>
          <FormInput
            name="spo2"
            label="SpO2"
            inputRef={register({
              min: 75,
              max: 100,
              required: true,
            })}
            errors={errors.spo2}
            errorText={SPO2_VALIDATION_ERROR}
            type="number"
          />
        </Grid>
        <Grid item>
          <FormInput
            name="heartRate"
            label="Heart Rate"
            inputRef={register({
              min: 20,
              max: 200,
              required: true,
            })}
            errors={errors.heartRate}
            errorText={HEART_RATE_VALIDATION_ERROR}
            type="number"
          />
        </Grid>
        <Grid item container justify="space-between">
          <FormButton label="Cancel" onClick={() => history.goBack()} />
          <FormButton label="Save" type="submit" />
        </Grid>
      </form>
      {pulseOximetryData ? (
        <ConfirmationDialog
          showDialog={showDialog}
          dialogTitle={`SpO2: ${pulseOximetryData.spo2}, Heart Rate: ${pulseOximetryData.heartRate}?`}
          dialogContent={
            "Are you sure that the values are correct? You cannot modify it later."
          }
          handleCancel={() => setShowDialog(false)}
          handleConfirm={handleDialogConfirm}
        />
      ) : null}
    </div>
  );
};

export default PulseOximetryForm;
