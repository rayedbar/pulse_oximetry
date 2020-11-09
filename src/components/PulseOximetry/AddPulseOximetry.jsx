import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
} from "@material-ui/core";

import { createOximeter as createPulseOximetryMutation } from "../../graphql/mutations";
import NumericInputField from "../shared/NumericInputField";

const AddOximeter = () => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 20,
      }}
    >
      <Grid container direction="column" alignItems="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Pulse Oximetry</h1>

          <NumericInputField
            name="spo2"
            label="SpO2"
            inputRef={register({
              min: 75,
              max: 100,
              required: true,
            })}
            errors={errors}
            errorText="SpO2 should be between 75 and 100"
          />

          <NumericInputField
            name="heartRate"
            label="Heart Rate"
            inputRef={register({
              min: 20,
              max: 200,
              required: true,
            })}
            errors={errors}
            errorText="Heart Rate should be between 20 and 200"
          />

          <Button
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
            style={{ marginTop: 20 }}
          >
            Save
          </Button>
        </form>
      </Grid>

      {pulseOximetryData ? (
        <Dialog
          open={showDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            SpO2: {pulseOximetryData.spo2}, Heart Rate:{" "}
            {pulseOximetryData.heartRate}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please make sure that you entered the data correctly. You cannot
              modify it later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};

export default AddOximeter;
