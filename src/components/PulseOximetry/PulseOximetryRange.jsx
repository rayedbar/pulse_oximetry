import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import ProgressBar from "../Shared/ProgressBar";
import FormTemplate from "../Shared/FormTemplate";
import PulseOximetryRangeForm from "./PulseOximetryRangeForm";
import LIST_INDIVIDUALS_WITH_PULSE_OXIMETRY_RANGE from "../../graphql/Individual/ListIndividualsWithPulseOximetryRange";
import { createPulseOximetryRange as CREATE_PULSE_OXIMETRY_RANGE } from "../../graphql/mutations";
import { URL } from "../../utils/constants";

const PulseOximetryRange = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(
    LIST_INDIVIDUALS_WITH_PULSE_OXIMETRY_RANGE
  );
  const [addPulseOximetryRange] = useMutation(
    gql(CREATE_PULSE_OXIMETRY_RANGE),
    {
      onCompleted: () => history.push(URL.HOME),
    }
  );

  const onSubmit = async (formData) => {
    const { minSpO2, minHeartRate, maxHeartRate, individualID } = formData;
    addPulseOximetryRange({
      variables: {
        input: {
          individualID: individualID,
          minSpO2: parseInt(minSpO2, 10),
          minHeartRate: parseInt(minHeartRate, 10),
          maxHeartRate: parseInt(maxHeartRate, 10),
        },
      },
      update(cache, { data: { createPulseOximetryRange } }) {
        cache.modify({
          id: cache.identify({
            id: individualID,
            __typename: "Individual",
          }),
          fields: {
            pulseOximetryRange() {
              const newPulseOximetryRangeRef = cache.writeFragment({
                data: createPulseOximetryRange,
                fragment: gql`
                  fragment NewPulseOximetryRange on PulseOximetryRange {
                    id
                    type
                  }
                `,
              });
              return {
                items: [newPulseOximetryRangeRef],
              };
            },
          },
        });
      },
    });
  };

  if (loading) return <ProgressBar />;
  if (error) return `Error! ${error.message}`;

  return (
    <FormTemplate>
      <PulseOximetryRangeForm
        formHeader="Pulse Oximetry Range"
        individuals={data.listIndividuals.items}
        onSubmit={onSubmit}
      />
    </FormTemplate>
  );
};

export default PulseOximetryRange;
