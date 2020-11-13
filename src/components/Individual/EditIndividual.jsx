import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import IndividualForm from "./IndividualForm";
import { format as formatDate } from "date-fns";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { API, Cache, graphqlOperation } from "aws-amplify";
import { updateIndividual as UpdateIndividualMutation } from "../../graphql/mutations";
import { URL } from "../../utils/constants";
import { INDIVIDUAL_PHOTO } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
  },
}));

const EditIndividual = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const [showProgressBar, setShowProgressBar] = useState(false);

  const onSubmit = (formData) => {
    setShowProgressBar(true);

    Cache.removeItem(location.state.id + INDIVIDUAL_PHOTO);

    const { dob, ...rest } = formData;
    const updateIndividual = async () => {
      try {
        await API.graphql(
          graphqlOperation(UpdateIndividualMutation, {
            input: {
              ...rest,
              dob: formatDate(dob, "yyyy-MM-dd"),
              id: location.state.id,
            },
          })
        );
        history.push(URL.HOME);
      } catch (error) {
        console.log("Error updating individual ", error);
      }
    };

    updateIndividual();
  };

  return (
    <div className={classes.root}>
      {showProgressBar === true ? (
        <CircularProgress />
      ) : (
        <IndividualForm
          individualDetail={location.state}
          individualID={location.state.id}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default EditIndividual;
