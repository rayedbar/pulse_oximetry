import React from "react";
import { useLocation } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

const Error = () => {
  const location = useLocation();
  console.log(location.state);

  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Please report to HSBT-Bio
    </Alert>
  );
};

export default Error;
