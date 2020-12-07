import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Grid } from "@material-ui/core";

import AlertRecipientForm from "./AlertRecipientForm";
import AlertRecipientCard from "./AlertRecipientCard";
import SubHeaderWithAddButton from "../Shared/SubHeaderWithAddButton";
import ProgressBar from "../Shared/ProgressBar";
import { listAlertRecipients as LIST_ALERT_RECIPIENTS } from "../../graphql/queries";
import { createAlertRecipient as CREATE_ALERT_RECIPIENT } from "../../graphql/mutations";

const AlertRecipient = () => {
  const [showFormDialog, setShowFormDialog] = useState(false);

  const { loading, error, data } = useQuery(gql(LIST_ALERT_RECIPIENTS));
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
    setShowFormDialog(false);
  };

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container>
      <Grid item xs={12}>
        <SubHeaderWithAddButton
          title="Alert Recipients"
          buttonDescription="Add Alert Recipient"
          buttonOnClick={() => setShowFormDialog(true)}
        />
      </Grid>
      <Grid item container spacing={2} style={{ marginTop: 10 }}>
        {data.listAlertRecipients.items.map((recipient) => (
          <Grid item key={recipient.id} xs={12}>
            <AlertRecipientCard recipient={recipient} />
          </Grid>
        ))}
      </Grid>
      <AlertRecipientForm
        formDialogState={[showFormDialog, setShowFormDialog]}
        onSubmit={onSubmit}
      />
    </Grid>
  );
};

export default AlertRecipient;
