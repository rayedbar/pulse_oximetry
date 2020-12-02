import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const RecipientCard = ({ recipient }) => (
  <Card>
    <CardContent>
      <Typography>{recipient.firstName + " " + recipient.lastName}</Typography>
      <Typography>{recipient.email}</Typography>
    </CardContent>
  </Card>
);

export default RecipientCard;
