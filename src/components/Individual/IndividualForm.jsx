import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import TextInputField from "../shared/TextInputField";
import SaveButton from "../shared/SaveButton";
import ImagePicker from "../shared/ImagePicker";
import { VALIDATION_REQUIRED } from "../../utils/constants";

const IndividualForm = ({ individualID, onSubmit }) => {
  const { register, errors, control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={6} sm={6} md={4} lg={5} xl={5}>
          <TextInputField
            name="firstName"
            label="First Name"
            inputRef={register({ required: true })}
            errors={errors.firstName}
            errorText={VALIDATION_REQUIRED}
          />

          <TextInputField
            name="lastName"
            label="Last Name"
            inputRef={register({ required: true })}
            errors={errors.lastName}
            errorText={VALIDATION_REQUIRED}
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

        <Grid item xs={12}>
          <SaveButton />
        </Grid>
      </Grid>
    </form>
  );
};

export default IndividualForm;
