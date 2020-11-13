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

const BackButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <FormControl margin="normal">
      <Button
        variant="contained"
        size="medium"
        onClick={onClick}
        className={classes.saveButton}
      >
        Back
      </Button>
    </FormControl>
  );
};

export default BackButton;
