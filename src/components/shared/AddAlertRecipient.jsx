import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
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
import { createNotify } from "../../graphql/mutations";
import { listNotifys } from "../../graphql/queries";

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

const AddAlertRecipient = () => {
  const classes = useStyles();
  const [recipients, setRecipients] = useState([]);
  const [showFormDialog, setShowFormDialog] = useState(false);

  useEffect(() => {
    const fetchNotifys = async () => {
      try {
        const recipientData = await API.graphql(graphqlOperation(listNotifys));
        setRecipients(recipientData.data.listNotifys.items);
      } catch (error) {
        console.log("Error Fetching Notify Data!", error);
      }
    };
    fetchNotifys();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const recepientData = await API.graphql(
        graphqlOperation(createNotify, {
          input: {
            ...formData,
          },
        })
      );
      setShowFormDialog(false);
      setRecipients(recipients.slice().concat(recepientData.data.createNotify));
    } catch (error) {
      console.log(error);
    }
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
          <Typography variant="h5">Notification Recipients</Typography>
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
        {recipients.map((data) => (
          <Grid item key={data.id} xs={12}>
            {RecipientCard(data)}
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

export default AddAlertRecipient;
