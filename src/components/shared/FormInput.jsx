import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  textField: {
    // width: "98%",
  },
});

const FormInput = ({
  name,
  label,
  inputRef,
  errors,
  errorText,
  value,
  type,
  defaultValue,
}) => {
  const classes = useStyles();

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
      // fullWidth
      InputProps={{
        className: classes.textField,
      }}
      margin="none"
    />
  );
};

export default FormInput;
