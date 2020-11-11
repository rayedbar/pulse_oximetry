import React from "react";

import { FormControl, Button } from "@material-ui/core";

const SaveButton = () => {
  return (
    <FormControl margin="normal">
      <Button variant="contained" color="primary" size="medium" type="submit">
        Save
      </Button>
    </FormControl>
  );
};

export default SaveButton;
