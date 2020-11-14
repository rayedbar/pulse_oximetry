import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import IndividualForm from "./IndividualForm";
import { format as formatDate } from "date-fns";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { API, graphqlOperation } from "aws-amplify";
import { createIndividual as AddIndividualMutation } from "../../graphql/mutations";
import { URL } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const AddIndividual = () => {
  const classes = useStyles();
  const history = useHistory();

  const [showProgressBar, setShowProgressBar] = useState(false);
  const [individualID, setIndividualID] = useState(uuidv4());

  const onSubmit = (formData) => {
    setShowProgressBar(true);

    const { dob, ...rest } = formData;
    const addIndividual = async () => {
      try {
        await API.graphql(
          graphqlOperation(AddIndividualMutation, {
            input: {
              ...rest,
              dob: formatDate(dob, "yyyy-MM-dd"),
              id: individualID,
            },
          })
        );
        history.push(URL.HOME);
      } catch {
        console.log("Error creating individual");
      }
    };

    addIndividual();
  };

  return (
    <div className={classes.root}>
      {showProgressBar === true ? (
        <CircularProgress />
      ) : (
        <IndividualForm
          individualID={individualID}
          formHeader="Add Individual"
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default AddIndividual;
