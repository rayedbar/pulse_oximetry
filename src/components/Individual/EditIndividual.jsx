import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import IndividualForm from "./IndividualForm";
import { format as formatDate } from "date-fns";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { API, Cache, graphqlOperation } from "aws-amplify";
import {
  updateIndividual as UpdateIndividualMutation,
  createPulseOximetryRange,
} from "../../graphql/mutations";
import { INDIVIDUAL_PHOTO } from "../../utils/constants";
import FormTemplate from "../shared/FormTemplate";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const EditIndividual = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const [showProgressBar, setShowProgressBar] = useState(false);

  const onSubmit = async (formData) => {
    setShowProgressBar(true);

    Cache.removeItem(location.state.id + INDIVIDUAL_PHOTO);
    // const { dob, minSpo2, minHeartRate, maxHeartRate, ...rest } = formData;
    const { dob, ...rest } = formData;

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
      // await API.graphql(
      //   graphqlOperation(createPulseOximetryRange, {
      //     input: {
      //       individualID: location.state.id,
      //       minSpo2: parseInt(minSpo2, 10),
      //       minHeartRate: parseInt(minHeartRate, 10),
      //       maxHeartRate: parseInt(maxHeartRate, 10),
      //     },
      //   })
      // );

      history.goBack();
    } catch (error) {
      console.log("Error updating individual ", error);
      setShowProgressBar(false);
    }
  };

  return (
    <div className={classes.root}>
      {showProgressBar === true ? (
        <CircularProgress />
      ) : (
        <FormTemplate>
          <IndividualForm
            individualDetail={location.state}
            individualID={location.state.id}
            formHeader="Edit Individual"
            onSubmit={onSubmit}
          />
        </FormTemplate>
      )}
    </div>
  );
};

export default EditIndividual;
