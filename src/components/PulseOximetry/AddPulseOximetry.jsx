import React, { useState } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { useHistory, useLocation, useParams } from "react-router-dom";
import FormTemplate from "../shared/FormTemplate";
import PulseOximetryForm from "./PulseOximetryForm";
import { createOximeter as createPulseOximetryMutation } from "../../graphql/mutations";

const AddPulseOximetry = () => {
  const history = useHistory();
  const location = useLocation();
  const { individualID } = useParams();
  const [pulseOximetry, setPulseOximetry] = useState(null);

  const savePulseOximetry = async () => {
    try {
      await API.graphql(
        graphqlOperation(createPulseOximetryMutation, {
          input: {
            individualID: individualID,
            heartRate: parseInt(pulseOximetry.heartRate, 10),
            spo2: parseInt(pulseOximetry.spo2, 10),
            pulseOximetryRange: JSON.stringify(location.state),
          },
        })
      );
      history.goBack();
    } catch (error) {
      console.log("Error adding oximeter reading", error);
    }
  };

  return (
    <FormTemplate>
      <PulseOximetryForm
        pulseOximetryState={[pulseOximetry, setPulseOximetry]}
        savePulseOximetry={savePulseOximetry}
      />
    </FormTemplate>
  );
};

export default AddPulseOximetry;
