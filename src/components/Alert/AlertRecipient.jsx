import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "@material-ui/core";

import AlertRecipientCard from "./AlertRecipientCard";
import SubHeaderWithAddButton from "../Shared/SubHeaderWithAddButton";
import ProgressBar from "../Shared/ProgressBar";
import { URL } from "../../utils/constants";
import { listAlertRecipients as LIST_ALERT_RECIPIENTS } from "../../graphql/queries";

const AlertRecipient = () => {
  const history = useHistory();

  const { loading, error, data } = useQuery(gql(LIST_ALERT_RECIPIENTS));

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container>
      <Grid item xs={12}>
        <SubHeaderWithAddButton
          title="Alert Recipients"
          buttonDescription="Add Alert Recipient"
          buttonOnClick={() => history.push(URL.ALERT_RECIPIENTS_ADD)}
        />
      </Grid>
      <Grid item container spacing={2} style={{ marginTop: 10 }}>
        {data.listAlertRecipients.items.map((recipient) => (
          <Grid item key={recipient.id} xs={12}>
            <AlertRecipientCard recipient={recipient} />
          </Grid>
        ))}
      </Grid>
      {/* <AlertRecipientForm
        formDialogState={[showFormDialog, setShowFormDialog]}
        onSubmit={onSubmit}
      /> */}
    </Grid>
  );
};

export default AlertRecipient;
