import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, TextField, MenuItem, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";

import FormInput from "../Shared/FormInput";
import FormButton from "../Shared/FormButton";
import IndividualAvatar from "../Individual/IndividualAvatar";
import { PULSE_OXIMETRY_DEFAULT_RANGE, URL } from "../../utils/constants";

const PulseOximetryRangeForm = ({ individuals, formHeader, onSubmit }) => {
  const history = useHistory();
  const { register, errors, clearErrors, setValue, handleSubmit } = useForm();

  const [selectedIndividual, setSelectedIndividual] = useState(null);

  useEffect(() => {
    register("individualID");
  }, [register]);

  useEffect(() => {
    if (selectedIndividual) {
      clearErrors();
      if (selectedIndividual.pulseOximetryRange.items[0]) {
        const formFields = ["minSpO2", "minHeartRate", "maxHeartRate"];
        for (let field of formFields) {
          setValue(
            field,
            selectedIndividual.pulseOximetryRange.items[0][field]
          );
        }
      } else {
        setValue("minSpO2", PULSE_OXIMETRY_DEFAULT_RANGE.MIN_SPO2);
        setValue("minHeartRate", PULSE_OXIMETRY_DEFAULT_RANGE.MIN_HEART_RATE);
        setValue("maxHeartRate", PULSE_OXIMETRY_DEFAULT_RANGE.MAX_HEART_RATE);
      }
    }
  }, [selectedIndividual, setValue]);

  const handleSelectedIndividualChange = (event) => {
    let individualID = event.target.value;
    setValue(event.target.name, individualID);
    for (let individual of individuals) {
      if (individual.id === individualID) {
        setSelectedIndividual(individual);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item>
          <Typography variant="h4">{formHeader}</Typography>
        </Grid>

        <Grid item>
          <TextField
            select
            name="individualID"
            label="Select Individual"
            fullWidth
            onChange={handleSelectedIndividualChange}
          >
            {individuals.map((individual) => (
              <MenuItem value={individual.id}>
                <Grid container justify="space-between" alignItems="center">
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
        </Grid>

        <Grid item>
          <FormInput
            name="minSpO2"
            label="Minimum SpO2"
            inputRef={register({
              min: 75,
              max: 96,
              required: true,
            })}
            defaultValue={PULSE_OXIMETRY_DEFAULT_RANGE.MIN_SPO2}
            errors={errors.minSpO2}
            errorText="Should be between 75 and 96"
            type="number"
            disabled={selectedIndividual ? false : true}
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
            defaultValue={PULSE_OXIMETRY_DEFAULT_RANGE.MIN_HEART_RATE}
            errors={errors.minHeartRate}
            errorText={"Should be between 20 and 60"}
            type="number"
            disabled={selectedIndividual ? false : true}
          />
        </Grid>

        <Grid item>
          <FormInput
            name="maxHeartRate"
            label="Maximum Heart Rate"
            inputRef={register({
              min: 90,
              max: 200,
              required: true,
            })}
            defaultValue={PULSE_OXIMETRY_DEFAULT_RANGE.MAX_HEART_RATE}
            errors={errors.maxHeartRate}
            errorText={"Should be between 90 and 200"}
            type="number"
            disabled={selectedIndividual ? false : true}
          />
        </Grid>

        <Grid item container justify="space-between">
          <FormButton label="Cancel" onClick={() => history.push(URL.HOME)} />
          <FormButton label="Save" type="submit" />
        </Grid>
      </form>
    </div>
  );
};

export default PulseOximetryRangeForm;
