import React from "react";

import { FormControl, InputLabel, Input, Typography } from "@material-ui/core";

const TextInputField = ({
  name,
  label,
  inputRef,
  errors,
  errorText,
  placeholder,
}) => {
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        name={name}
        type="text"
        inputRef={inputRef}
        placeholder={placeholder}
      />
      {errors && <Typography color="error">{errorText}</Typography>}
    </FormControl>
  );
};

export default TextInputField;
