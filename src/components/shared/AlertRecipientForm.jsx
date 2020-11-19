import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API, graphqlOperation } from "aws-amplify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import FormInput from "./FormInput";
import { createNotify } from "../../graphql/mutations";

const AlertRecipientForm = ({
  formDialogState: [showFormDialog, setShowFormDialog],
}) => {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    try {
      await API.graphql(
        graphqlOperation(createNotify, {
          input: {
            ...formData,
          },
        })
      );
      setShowFormDialog(false);
      history.pushState(URL.ALERT_RECIPIENT_SETTINGS);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        open={showFormDialog}
        onClose={() => setShowFormDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Alert Recipient</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              To subscribe to pulse oximetry alerts, please enter your
              information here.
            </DialogContentText>
            <FormInput
              name="firstName"
              label="First Name"
              type="text"
              inputRef={register({
                required: true,
              })}
              errors={errors.firstName}
              errorText={"Required"}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              type="text"
              inputRef={register({
                required: true,
              })}
              errors={errors.firstName}
              errorText={"Required"}
            />
            <FormInput
              name="email"
              label="Email"
              type="email"
              inputRef={register({
                required: true,
              })}
              errors={errors.firstName}
              errorText={"Required"}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowFormDialog(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AlertRecipientForm;
