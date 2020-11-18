import React, { useState } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { useHistory, useParams } from "react-router-dom";
import FormTemplate from "../shared/FormTemplate";
import PulseOximetryForm from "./PulseOximetryForm";
import { createOximeter as createPulseOximetryMutation } from "../../graphql/mutations";

const AddPulseOximetry = () => {
  const history = useHistory();
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
          },
        })
      );
      history.goBack();
    } catch {
      console.log("Error adding oximeter reading");
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
