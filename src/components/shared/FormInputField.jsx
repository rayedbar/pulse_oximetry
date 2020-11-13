import React from "react";

import { TextField } from "@material-ui/core";

const FormInputField = ({
  name,
  label,
  inputRef,
  errors,
  errorText,
  value,
  type,
}) => {
  return (
    <TextField
      id={`${name}-outlined-required`}
      name={name}
      label={label}
      value={value}
      type={type}
      inputRef={inputRef}
      error={errors ? true : false}
      helperText={errors && errorText}
      variant="outlined"
    />
  );
};

export default FormInputField;
