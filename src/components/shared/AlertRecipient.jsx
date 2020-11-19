import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { listNotifys } from "../../graphql/queries";
// import FormTemplate from "./FormTemplate";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import AlertRecipientForm from "./AlertRecipientForm";

const AlertRecipient = () => {
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
      <Grid item container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Current Recipients</Typography>
        </Grid>
        <Grid item>
          <IconButton
            title="Add Recipient"
            variant="contained"
            onClick={() => setShowFormDialog(true)}
            color="inherit"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {recipients.map((data) => (
          <Grid item id={data.id} xs={12}>
            {RecipientCard(data)}
          </Grid>
        ))}
      </Grid>
      <AlertRecipientForm
        formDialogState={[showFormDialog, setShowFormDialog]}
      />
    </Grid>
  );
};

export default AlertRecipient;
