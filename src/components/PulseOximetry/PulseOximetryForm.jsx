import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@material-ui/core";

import FormInput from "../Shared/FormInput";
import FormButton from "../Shared/FormButton";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import {
  SPO2_VALIDATION_ERROR,
  HEART_RATE_VALIDATION_ERROR,
} from "../../utils/constants";

const PulseOximetryForm = ({
  pulseOximetryState: [pulseOximetry, setPulseOximetry],
  savePulseOximetry,
}) => {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          setPulseOximetry(data);
          setShowDialog(true);
        })}
      >
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
      <ConfirmationDialog
        showDialog={showDialog}
        dialogTitle={`SpO2: ${pulseOximetry?.spo2}, Heart Rate: ${pulseOximetry?.heartRate}?`}
        dialogContent={
          "Are you sure that the values are correct? You cannot modify it later."
        }
        handleCancel={() => setShowDialog(false)}
        handleConfirm={() => {
          setShowDialog(false);
          savePulseOximetry();
        }}
      />
    </div>
  );
};

export default PulseOximetryForm;
