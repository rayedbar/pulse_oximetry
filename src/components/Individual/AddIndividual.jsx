import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { format as formatDate } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { createIndividual } from "../../graphql/mutations";
import IndividualForm from "./IndividualForm";
import { URL } from "../../utils/constants";
import FormTemplate from "../Shared/FormTemplate";
import ProgressBar from "../Shared/ProgressBar";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
}));

const AddIndividual = () => {
  const classes = useStyles();
  const history = useHistory();

  const [individualID] = useState(uuidv4());
  const [addIndividual, { loading, error }] = useMutation(
    gql(createIndividual),
    {
      update(cache, { data: { createIndividual } }) {
        cache.modify({
          fields: {
            listIndividuals(existingIndividuals) {
              const newIndividualRef = cache.writeFragment({
                data: createIndividual,
                fragment: gql`
                  fragment NewIndividual on Individual {
                    id
                    type
                  }
                `,
              });

              return {
                items: [...existingIndividuals.items, newIndividualRef],
              };
            },
          },
        });
      },
    }
  );

  const onSubmit = (formData) => {
    const { dob, ...rest } = formData;
    addIndividual({
      variables: {
        input: {
          ...rest,
          dob: formatDate(dob, "yyyy-MM-dd"),
          id: individualID,
        },
      },
    });
    history.push(URL.HOME);
  };

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <FormTemplate>
        <IndividualForm
          individualID={individualID}
          formHeader="Add Individual"
          onSubmit={onSubmit}
        />
      </FormTemplate>
    </div>
  );
};

export default AddIndividual;
