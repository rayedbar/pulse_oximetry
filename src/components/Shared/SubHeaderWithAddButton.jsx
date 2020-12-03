import React from "react";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  iconSize: {
    fontSize: 30,
  },
  subHeader: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    padding: 5,
  },
  title: {
    marginLeft: 10,
  },
}));

const SubHeaderWithAddButton = ({
  title,
  buttonOnClick,
  buttonDescription,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.subHeader}
    >
      <Grid item className={classes.title}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          title={buttonDescription}
          variant="contained"
          color="inherit"
          onClick={buttonOnClick}
        >
          <AddCircleOutlineIcon className={classes.iconSize} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SubHeaderWithAddButton;
