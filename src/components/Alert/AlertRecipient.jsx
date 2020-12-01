import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AlertRecipientForm from "./AlertRecipientForm";
import { createAlertRecipient } from "../../graphql/mutations";
import { listAlertRecipients } from "../../graphql/queries";
import ProgressBar from "../Shared/ProgressBar";

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

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

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

  const RecipientCard = (recipient) => (
    <Card>
      <CardContent>
        <Typography>
          {recipient.firstName + " " + recipient.lastName}
        </Typography>
        <Typography>{recipient.email}</Typography>
      </CardContent>
    </Card>
  );

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
            {RecipientCard(recipient)}
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
