import React from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Cache } from "aws-amplify";
import IndividualForm from "./IndividualForm";
import { format as formatDate } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { updateIndividual as UpdateIndividualMutation } from "../../graphql/mutations";
import FormTemplate from "../Shared/FormTemplate";
import ProgressBar from "../Shared/ProgressBar";
import { INDIVIDUAL_PHOTO } from "../../utils/constants";

const GET_INDIVIDUAL = gql`
  query GetIndividual($id: ID!) {
    getIndividual(id: $id) {
      id
      firstName
      lastName
      gender
      dob
    }
  }
`;

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
    gql(UpdateIndividualMutation)
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
