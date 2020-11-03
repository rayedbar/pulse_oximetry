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
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from "@material-ui/core";
import { createOximeter as createOximeterMutation } from "../graphql/mutations";

const AddOximeter = () => {
  const { individualID } = useParams();
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState();

  const handleClickOpen = data => {
    setFormData(data);
    setConfirmationOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmationOpen(false);
    saveOximeterData();
  };

  const handleCloseCancel = () => {
    setConfirmationOpen(false);
  };

  const saveOximeterData = () => {
    async function createOximeter() {
      try {
        const oximeterData = await API.graphql(
          graphqlOperation(createOximeterMutation, {
            input: {
              individualID: individualID,
              heartRate: parseInt(formData.heartRate, 10),
              spo2: parseInt(formData.spo2, 10),
            },
          })
        );
        console.log(oximeterData);
        history.goBack();
      } catch {
        console.log("Error adding oximeter reading");
      }
    }
    handleClickOpen();
    createOximeter();
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
      <form onSubmit={handleSubmit(handleClickOpen)}>
        <h1>Pulse Oximetry</h1>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="spo2">SpO2</InputLabel>
          <Input
            name="spo2"
            type="number"
            inputRef={register({ min: 75, max: 100, required: true })}
          />
          {errors.spo2 && (
            <Typography color="error">
              SpO2 should be between 75 and 100
            </Typography>
          )}
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="heartRate">Heart Rate</InputLabel>
          <Input
            name="heartRate"
            type="number"
            inputRef={register({ min: 20, max: 200, required: true })}
          />
          {errors.heartRate && (
            <Typography color="error">
              Heart Rate should be between 20 and 200
            </Typography>
          )}
        </FormControl>

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

      <Dialog
        open={confirmationOpen}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please make sure that you entered the data correctly. You cannot
            modify it later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddOximeter;
