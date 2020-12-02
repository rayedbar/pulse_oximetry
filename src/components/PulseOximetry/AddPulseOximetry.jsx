import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useHistory, useLocation, useParams } from "react-router-dom";

import FormTemplate from "../Shared/FormTemplate";
import PulseOximetryForm from "./PulseOximetryForm";
import ProgressBar from "../Shared/ProgressBar";
import { URL } from "../../utils/constants";
import { createPulseOximetry } from "../../graphql/mutations";

const AddPulseOximetry = () => {
  const history = useHistory();
  const location = useLocation();
  const { individualID } = useParams();
  const [pulseOximetry, setPulseOximetry] = useState(null);
  const [addPulseOximetry, { loading }] = useMutation(
    gql(createPulseOximetry),
    {
      update(cache, { data: { createPulseOximetry } }) {
        cache.modify({
          id: cache.identify({ id: individualID, __typename: "Individual" }),
          fields: {
            pulseOximetry(existingPulseOximetry) {
              const newPulseOximetryRef = cache.writeFragment({
                data: createPulseOximetry,
                fragment: gql`
                  fragment NewPulseOximetry on PulseOximetry {
                    id
                    type
                  }
                `,
              });
              return {
                items: [newPulseOximetryRef, ...existingPulseOximetry.items],
              };
            },
          },
        });
      },
    }
  );

  const savePulseOximetry = async () => {
    await addPulseOximetry({
      variables: {
        input: {
          individualID: individualID,
          heartRate: parseInt(pulseOximetry.heartRate, 10),
          spO2: parseInt(pulseOximetry.spo2, 10),
          range: JSON.stringify(location.state),
        },
      },
    });
    history.push(`${URL.PULSE_OXIMETRY}/${individualID}`);
  };

  if (loading) return <ProgressBar />;

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
