import React from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  Grid,
  TextField,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import ImagePicker from "../shared/ImagePicker";
import { VALIDATION_REQUIRED } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const IndividualForm = ({ individualID, onSubmit }) => {
  const history = useHistory();
  const classes = useStyles();
  const { register, errors, control, handleSubmit } = useForm();

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={6} sm={6} md={4} lg={5} xl={5}>
          <FormInput
            name="firstName"
            label="First Name"
            inputRef={register({ required: true })}
            errors={errors.firstName}
            errorText={VALIDATION_REQUIRED}
            type="text"
          />

          <FormInput
            name="lastName"
            label="Last Name"
            inputRef={register({ required: true })}
            errors={errors.lastName}
            errorText={VALIDATION_REQUIRED}
            type="text"
          />

          <FormControl margin="normal" fullWidth>
            <Controller
              as={
                <TextField
                  select
                  name="gender"
                  label="Gender"
                  defaultValue="other"
                  inputRef={register({ required: true })}
                >
                  <MenuItem value="male">Male</MenuItem>

                  <MenuItem value="female">Female</MenuItem>

                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              }
              name="gender"
              control={control}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <Controller
              as={
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="yyyy-MM-dd"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                />
              }
              name="dob"
              control={control}
            />
          </FormControl>
        </Grid>

        <Grid item xs={false} sm={false} md={false} lg={2} xl={2}></Grid>

        <Grid item xs={6} sm={6} md={4} lg={5} xl={5}>
          <ImagePicker individualID={individualID} />
        </Grid>

        <Grid item container justify="space-between" xs={12} sm={12} md={5}>
          <FormButton label="Cancel" onClick={() => history.goBack()} />
          <FormButton label="Save" type="submit" />
        </Grid>
      </Grid>
    </form>
  );
};

export default IndividualForm;
