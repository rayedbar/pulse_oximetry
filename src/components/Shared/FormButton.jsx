import React from "react";

import { FormControl, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formButton: {
    backgroundColor: theme.palette.button.main,
    "&:hover": {
      backgroundColor: theme.palette.button.hover,
    },
  },
}));

const FormButton = ({ label, type, onClick }) => {
  const classes = useStyles();

  return (
    <FormControl margin="normal">
      <Button
        variant="contained"
        size="medium"
        type={type}
        onClick={onClick}
        className={classes.formButton}
      >
        {label}
      </Button>
    </FormControl>
  );
};

export default FormButton;
