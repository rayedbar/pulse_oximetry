import React from "react";

import { FormControl, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  saveButton: {
    backgroundColor: theme.palette.button.main,
    "&:hover": {
      backgroundColor: theme.palette.button.hover,
    },
  },
}));

const SaveButton = () => {
  const classes = useStyles();

  return (
    <FormControl margin="normal">
      <Button
        variant="contained"
        size="medium"
        type="submit"
        className={classes.saveButton}
      >
        Save
      </Button>
    </FormControl>
  );
};

export default SaveButton;
