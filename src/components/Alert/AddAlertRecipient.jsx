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
    // <Grid container>
    //   <Grid item xs={12}>
    //     <SubHeaderWithAddButton
    //       title="Alert Recipients"
    //       buttonDescription="Add Alert Recipient"
    //       buttonOnClick={() => setShowFormDialog(true)}
    //     />
    //   </Grid>
    //   <Grid item container spacing={2} style={{ marginTop: 10 }}>
    //     {data.listAlertRecipients.items.map((recipient) => (
    //       <Grid item key={recipient.id} xs={12}>
    //         <AlertRecipientCard recipient={recipient} />
    //       </Grid>
    //     ))}
    //   </Grid>
    //   <AlertRecipientForm
    //     formDialogState={[showFormDialog, setShowFormDialog]}
    //     onSubmit={onSubmit}
    //   />
    // </Grid>
  );
};

export default AddAlertRecipient;
