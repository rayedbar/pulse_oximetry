import React from "react";

import { FormControl, InputLabel, Input, Typography } from "@material-ui/core";

const FormInputField = ({
  name,
  label,
  inputRef,
  errors,
  errorText,
  value,
  onChange,
  type,
}) => {
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        name={name}
        type={type}
        inputRef={inputRef}
        value={value}
        onChange={onChange}
      />
      {errors && <Typography color="error">{errorText}</Typography>}
    </FormControl>
  );
};

export default FormInputField;
