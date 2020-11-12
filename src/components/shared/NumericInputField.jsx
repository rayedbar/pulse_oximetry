import React from "react";

import { FormControl, InputLabel, Input, Typography } from "@material-ui/core";

const NumericInputField = ({ name, label, inputRef, errors, errorText }) => {
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input name={name} type="number" inputRef={inputRef} />
      {errors && <Typography color="error">{errorText}</Typography>}
    </FormControl>
  );
};

export default NumericInputField;
