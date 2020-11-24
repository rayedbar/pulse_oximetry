import React from "react";
import { TextField } from "@material-ui/core";

const FormInput = ({
  name,
  label,
  inputRef,
  errors,
  errorText,
  value,
  type,
  defaultValue,
  disabled,
}) => {
  return (
    <TextField
      id={`${name}-outlined-required`}
      name={name}
      label={label}
      value={value}
      defaultValue={defaultValue}
      type={type}
      inputRef={inputRef}
      error={errors ? true : false}
      helperText={errors && errorText}
      disabled={disabled}
      fullWidth
    />
  );
};

export default FormInput;
