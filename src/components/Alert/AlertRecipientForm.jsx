import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Typography, Grid } from "@material-ui/core";

import FormInput from "../Shared/FormInput";
import FormButton from "../Shared/FormButton";

const AlertRecipientForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item>
          <Typography variant="h4">Alert Recipient</Typography>
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <FormInput
            name="lastName"
            label="Last Name"
            type="text"
            inputRef={register({
              required: true,
            })}
            errors={errors.lastName}
            errorText={"Required"}
          />
        </Grid>
        <Grid item>
          <FormInput
            name="email"
            label="Email"
            type="email"
            inputRef={register({
              required: "Required",
            })}
            errors={errors.email}
            errorText={"Required"}
          />
        </Grid>
        <Grid item>
          <FormInput
            name="phone"
            label="Phone Number"
            type="tel"
            inputRef={register({
              required: "Required",
            })}
            errors={errors.phone}
            errorText={"Required"}
          />
        </Grid>
        <Grid item container justify="space-between">
          <FormButton label="Cancel" onClick={() => history.goBack()} />
          <FormButton label="Save" type="submit" />
        </Grid>
      </form>
    </div>
  );
};

export default AlertRecipientForm;
