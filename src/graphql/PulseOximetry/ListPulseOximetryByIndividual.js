import { gql } from "@apollo/client";

const LIST_PULSE_OXIMETRY_BY_INDIVIDUAL = gql`
  query GetIndividual($id: ID!) {
    getIndividual(id: $id) {
      id
      firstName
      lastName
      gender
      dob
      pulseOximetry(sortDirection: DESC) {
        items {
          id
          spO2
          heartRate
          createdAt
          range
        }
      }
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

export default LIST_PULSE_OXIMETRY_BY_INDIVIDUAL;
