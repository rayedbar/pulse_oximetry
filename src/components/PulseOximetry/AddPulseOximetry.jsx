import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormControl, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { createOximeter as createPulseOximetryMutation } from "../../graphql/mutations";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import {
  SPO2_VALIDATION_ERROR,
  HEART_RATE_VALIDATION_ERROR,
} from "../../utils/constants";
import ConfirmationDialog from "../shared/ConfirmationDialog";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
  },
  form: {
    paddingTop: 20,
  },
  formInputField: {
    paddingBottom: 10,
  },
}));

const AddOximeter = () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Typography variant="h4">Pulse Oximetry</Typography>

          <FormControl
            margin="normal"
            fullWidth
            className={classes.formInputField}
          >
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
          </FormControl>

          <FormControl
            margin="normal"
            fullWidth
            className={classes.formInputField}
          >
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
          </FormControl>

          <Grid container justify="space-between">
            <FormButton label="Cancel" onClick={() => history.goBack()} />
            <FormButton label="Save" type="submit" />
          </Grid>
        </form>
      </Grid>

      {pulseOximetryData ? (
        <ConfirmationDialog
          showDialog={showDialog}
          dialogTitle={`SpO2: ${pulseOximetryData.spo2}, Heart Rate: ${pulseOximetryData.heartRate}?`}
          dialogContent={
            "Please make sure that you entered the data correctly. You cannot modify it later."
          }
          handleCancel={() => setShowDialog(false)}
          handleConfirm={handleDialogConfirm}
        />
      ) : null}
    </div>
  );
};

export default AddOximeter;
