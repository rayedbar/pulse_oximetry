import React, { useState } from "react";

// import { API, graphqlOperation } from "aws-amplify";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useLocation, useParams } from "react-router-dom";
import FormTemplate from "../Shared/FormTemplate";
import PulseOximetryForm from "./PulseOximetryForm";
import { createPulseOximetry } from "../../graphql/mutations";
import { getIndividualWithPulseOximetryCreatedAtDESC } from "../../graphql/custom-queries";

const AddPulseOximetry = () => {
  const history = useHistory();
  const location = useLocation();
  const { individualID } = useParams();
  const [pulseOximetry, setPulseOximetry] = useState(null);
  const [addPulseOximetry] = useMutation(gql(createPulseOximetry), {
    update(cache, { data: { createPulseOximetry } }) {
      console.log(
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
        })
      );
    },
    onCompleted: () => history.goBack(),
  });

  const savePulseOximetry = async () => {
    addPulseOximetry({
      variables: {
        input: {
          individualID: individualID,
          heartRate: parseInt(pulseOximetry.heartRate, 10),
          spO2: parseInt(pulseOximetry.spo2, 10),
          range: JSON.stringify(location.state),
        },
      },
    });
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
