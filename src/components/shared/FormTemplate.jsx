import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  formInput: {
    "& .MuiGrid-item": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const FormTemplate = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item xs={false} lg={2} />
      <Grid
        item
        container
        direction="column"
        className={classes.formInput}
        xs={12}
        lg={8}
      >
        {children}
      </Grid>
      <Grid item xs={false} lg={2} />
    </Grid>
  );
};

export default FormTemplate;
