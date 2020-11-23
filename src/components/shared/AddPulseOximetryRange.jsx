import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";

import { listIndividualsWithPulseOximetryRange } from "../../graphql/custom-queries";
import { createPulseOximetryRange } from "../../graphql/mutations";
import FormTemplate from "./FormTemplate";
import PulseOximetryRangeForm from "./PulseOximetryRangeForm";
import { URL } from "../../utils/constants";

const AddPulseOximetryRange = () => {
  const history = useHistory();
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    const fetchIndiviuals = async () => {
      try {
        const individualData = await API.graphql(
          graphqlOperation(listIndividualsWithPulseOximetryRange)
        );
        setIndividuals(individualData.data.listIndividuals.items);
      } catch (error) {
        console.log("Error Fetching Data!", error);
      }
    };
    fetchIndiviuals();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const { minSpO2, minHeartRate, maxHeartRate, ...rest } = formData;

      await API.graphql(
        graphqlOperation(createPulseOximetryRange, {
          input: {
            ...rest,
            minSpO2: parseInt(minSpO2, 10),
            minHeartRate: parseInt(minHeartRate, 10),
            maxHeartRate: parseInt(maxHeartRate, 10),
          },
        })
      );
      history.push(URL.HOME);
    } catch (error) {
      console.log("Error setting pulse oximetry range", error);
    }
  };

  return (
    <FormTemplate>
      <PulseOximetryRangeForm
        formHeader="Pulse Oximetry Range"
        individuals={individuals}
        onSubmit={onSubmit}
      />
    </FormTemplate>
  );
};

export default AddPulseOximetryRange;
