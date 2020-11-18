import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, TextField, MenuItem, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../shared/FormInput";
import FormButton from "../shared/FormButton";
import ImagePicker from "../shared/ImagePicker";
import { VALIDATION_REQUIRED } from "../../utils/constants";

const IndividualForm = ({
  individualDetail,
  individualID,
  formHeader,
  onSubmit,
}) => {
  const history = useHistory();
  const { register, errors, control, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item>
          <Typography variant="h4">{formHeader}</Typography>
        </Grid>
        <Grid item>
          <FormInput
            name="firstName"
            label="First Name"
            defaultValue={individualDetail ? individualDetail.firstName : ""}
            inputRef={register({ required: true })}
            errors={errors.firstName}
            errorText={VALIDATION_REQUIRED}
            type="text"
          />
        </Grid>
        <Grid item>
          <FormInput
            name="lastName"
            label="Last Name"
            defaultValue={individualDetail ? individualDetail.lastName : ""}
            inputRef={register({ required: true })}
            errors={errors.lastName}
            errorText={VALIDATION_REQUIRED}
            type="text"
          />
        </Grid>
        <Grid item>
          <Controller
            as={
              <TextField select name="gender" label="Gender" fullWidth>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            }
            name="gender"
            defaultValue={individualDetail ? individualDetail.gender : "other"}
            rules={{ required: true }}
            control={control}
          />
        </Grid>
        <Grid item>
          <Controller
            as={
              <DatePicker
                disableFuture
                openTo="year"
                format="yyyy-MM-dd"
                label="Date of birth"
                views={["year", "month", "date"]}
                fullWidth
              />
            }
            name={"dob"}
            defaultValue={
              individualDetail ? new Date(individualDetail.dob) : new Date()
            }
            rules={{ required: true }}
            control={control}
          />
        </Grid>
        {/* <Grid item>
          <FormInput
            name="minSpo2"
            label="Minimum SpO2"
            inputRef={register({
              min: 75,
              max: 96,
            })}
            defaultValue={
              individualDetail.pulseOximetryRange.items[0]
                ? individualDetail.pulseOximetryRange.items[0].minSpo2
                : 95
            }
            errors={errors.minSpo2}
            errorText="Should be between 75 and 96"
            type="number"
          />
        </Grid>
        <Grid item>
          <FormInput
            name="minHeartRate"
            label="Minimum Heart Rate"
            inputRef={register({
              min: 20,
              max: 60,
              required: true,
            })}
            defaultValue={
              individualDetail.pulseOximetryRange.items[0]
                ? individualDetail.pulseOximetryRange.items[0].minHeartRate
                : 60
            }
            errors={errors.minHeartRate}
            errorText={"Should be between 20 and 60"}
            type="number"
          />
        </Grid>
        <Grid item>
          <FormInput
            name="maxHeartRate"
            label="Maximum Heart Rate"
            inputRef={register({
              min: 100,
              max: 200,
              required: true,
            })}
            defaultValue={
              individualDetail.pulseOximetryRange.items[0]
                ? individualDetail.pulseOximetryRange.items[0].maxHeartRate
                : 100
            }
            errors={errors.maxHeartRate}
            errorText={"Should be between 100 and 200"}
            type="number"
          />
        </Grid> */}
        <Grid item>
          <ImagePicker individualID={individualID} />
        </Grid>
        <Grid item container justify="space-between">
          <FormButton label="Cancel" onClick={() => history.goBack()} />
          <FormButton label="Save" type="submit" />
        </Grid>
      </form>
    </div>
  );
};

export default IndividualForm;
