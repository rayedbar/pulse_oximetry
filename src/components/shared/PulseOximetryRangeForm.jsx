import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, TextField, MenuItem, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import IndividualAvatar from "../Individual/IndividualAvatar";

const PulseOximetryRangeForm = ({ individuals, formHeader, onSubmit }) => {
  const history = useHistory();
  const { register, errors, control, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item>
          <Typography variant="h4">{formHeader}</Typography>
        </Grid>

        <Grid item>
          <Controller
            as={
              <TextField
                select
                name="individual"
                label="Select Individual"
                fullWidth
              >
                {individuals.map((individual) => (
                  <MenuItem value={individual.id}>
                    <Grid container justify="space-evenly" alignItems="center">
                      <IndividualAvatar
                        individualID={individual.id}
                        individualName={individual.firstName}
                      />
                      <Typography>
                        {individual.firstName + " " + individual.lastName}
                      </Typography>
                    </Grid>
                  </MenuItem>
                ))}
              </TextField>
            }
            name="individualID"
            // defaultValue={1}
            rules={{ required: true }}
            control={control}
          />
        </Grid>

        <Grid item>
          <FormInput
            name="minSpO2"
            label="Minimum SpO2"
            inputRef={register({
              min: 75,
              max: 96,
            })}
            defaultValue={95}
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
            defaultValue={60}
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
            defaultValue={100}
            errors={errors.maxHeartRate}
            errorText={"Should be between 100 and 200"}
            type="number"
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

export default PulseOximetryRangeForm;
