import { gql } from "@apollo/client";

const GET_PULSE_OXIMETRY_RANGE_BY_INDIVIDUAL = gql`
  query GetIndividual($id: ID!) {
    getIndividual(id: $id) {
      id
      pulseOximetryRange(limit: 1, sortDirection: DESC) {
        items {
          id
          minSpO2
          minHeartRate
          maxHeartRate
        }
      }
    }
  }
`;

export default GET_PULSE_OXIMETRY_RANGE_BY_INDIVIDUAL;
