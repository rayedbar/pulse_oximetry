import React from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import FormInputField from "../shared/FormInput";
import SaveButton from "../shared/SaveButton";
import BackButton from "../shared/BackButton";
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
          <FormInputField
            name="firstName"
            label="First Name"
            inputRef={register({ required: true })}
            errors={errors.firstName}
            errorText={VALIDATION_REQUIRED}
            type="text"
          />

          <FormInputField
            name="lastName"
            label="Last Name"
            inputRef={register({ required: true })}
            errors={errors.lastName}
            errorText={VALIDATION_REQUIRED}
            type="text"
          />

          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Gender</FormLabel>
            <Controller
              as={RadioGroup}
              aria-label="gender"
              name="gender"
              defaultValue="other"
              control={control}
              rules={{ required: true }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </Controller>
            {errors.gender && <Typography color="error">Required</Typography>}
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
          <BackButton onClick={() => history.goBack()} />
          <SaveButton />
        </Grid>
      </Grid>
    </form>
  );
};

export default IndividualForm;
