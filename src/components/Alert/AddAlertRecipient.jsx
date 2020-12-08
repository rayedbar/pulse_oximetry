import React from "react";

import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import AlertRecipientForm from "./AlertRecipientForm";
import { URL } from "../../utils/constants";
import { createAlertRecipient as CREATE_ALERT_RECIPIENT } from "../../graphql/mutations";
import FormTemplate from "../Shared/FormTemplate";

const AddAlertRecipient = () => {
  const history = useHistory();
  const [addAlertRecipient] = useMutation(gql(CREATE_ALERT_RECIPIENT), {
    update(cache, { data: { createAlertRecipient } }) {
      cache.modify({
        fields: {
          listAlertRecipients(existingAlertRecipients) {
            const newAlertRecipientRef = cache.writeFragment({
              data: createAlertRecipient,
              fragment: gql`
                fragment NewAlertRecipient on AlertRecipient {
                  id
                  type
                }
              `,
            });

            return {
              items: [...existingAlertRecipients.items, newAlertRecipientRef],
            };
          },
        },
      });
    },
  });

  const onSubmit = (formData) => {
    addAlertRecipient({
      variables: {
        input: {
          ...formData,
        },
      },
    });
    history.push(URL.ALERT_RECIPIENTS);
  };

  return (
    <FormTemplate>
      <AlertRecipientForm onSubmit={onSubmit} />
    </FormTemplate>
  );
};

export default AddAlertRecipient;
