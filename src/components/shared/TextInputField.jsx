import React from "react";

import { FormControl, InputLabel, Input, Typography } from "@material-ui/core";

const TextInputField = ({ name, label, inputRef, errors, errorText }) => {
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input name={name} type="text" inputRef={inputRef} />
      {errors && <Typography color="error">{errorText}</Typography>}
    </FormControl>
  );
};

export default TextInputField;
