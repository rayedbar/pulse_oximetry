import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import IndividualForm from "./IndividualForm";
import { format as formatDate } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { updateIndividual as UpdateIndividualMutation } from "../../graphql/mutations";
import FormTemplate from "../Shared/FormTemplate";
import ProgressBar from "../Shared/ProgressBar";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const EditIndividual = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const [updateIndividual, { loading, error }] = useMutation(
    gql(UpdateIndividualMutation)
  );

  const onSubmit = (formData) => {
    const { dob, ...rest } = formData;
    updateIndividual({
      variables: {
        input: {
          ...rest,
          dob: formatDate(dob, "yyyy-MM-dd"),
          id: location.state.id,
        },
      },
    });
    history.goBack();
  };

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <FormTemplate>
        <IndividualForm
          individualDetail={location.state}
          individualID={location.state.id}
          formHeader="Edit Individual"
          onSubmit={onSubmit}
        />
      </FormTemplate>
    </div>
  );
};

export default EditIndividual;
