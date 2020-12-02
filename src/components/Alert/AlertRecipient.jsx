import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AlertRecipientForm from "./AlertRecipientForm";
import AlertRecipientCard from "./AlertRecipientCard";
import ProgressBar from "../Shared/ProgressBar";
import { createAlertRecipient } from "../../graphql/mutations";
import { listAlertRecipients } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  iconSize: {
    fontSize: 30,
  },
  addRecipientHeader: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    marginBottom: 20,
  },
  addRecipientTitle: {
    marginLeft: 10,
  },
}));

const AlertRecipient = () => {
  const classes = useStyles();
  const [showFormDialog, setShowFormDialog] = useState(false);

  const { loading, error, data } = useQuery(gql(listAlertRecipients));
  const [addAlertRecipient] = useMutation(gql(createAlertRecipient), {
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
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        className={classes.addRecipientHeader}
      >
        <Grid item className={classes.addRecipientTitle}>
          <Typography variant="h5">Alert Recipients</Typography>
        </Grid>
        <Grid item>
          <IconButton
            title="Add Recipient"
            variant="contained"
            onClick={() => setShowFormDialog(true)}
            color="inherit"
          >
            <AddCircleOutlineIcon className={classes.iconSize} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
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
