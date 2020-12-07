import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Cache } from "aws-amplify";
import { format as formatDate } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import FormTemplate from "../Shared/FormTemplate";
import ProgressBar from "../Shared/ProgressBar";

import IndividualForm from "./IndividualForm";
import GET_INDIVIDUAL from "../../graphql/Individual/GetIndividual";
import { updateIndividual as UPDATE_INDIVIDUAL } from "../../graphql/mutations";
import { INDIVIDUAL_PHOTO } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const EditIndividual = () => {
  const history = useHistory();
  const { individualID } = useParams();
  const classes = useStyles();

  const { loading: queryLoading, data } = useQuery(GET_INDIVIDUAL, {
    variables: { id: individualID },
  });

  const [updateIndividual, { loading: mutationLoading, error }] = useMutation(
    gql(UPDATE_INDIVIDUAL)
  );

  const onSubmit = (formData) => {
    Cache.removeItem(data.getIndividual.id + INDIVIDUAL_PHOTO);
    const { dob, ...rest } = formData;
    updateIndividual({
      variables: {
        input: {
          ...rest,
          dob: formatDate(dob, "yyyy-MM-dd"),
          id: data.getIndividual.id,
        },
      },
    });
    history.goBack();
  };

  if (queryLoading || mutationLoading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <FormTemplate>
        <IndividualForm
          individualDetail={data.getIndividual}
          individualID={data.getIndividual.id}
          formHeader="Edit Individual"
          onSubmit={onSubmit}
        />
      </FormTemplate>
    </div>
  );
};

export default EditIndividual;
