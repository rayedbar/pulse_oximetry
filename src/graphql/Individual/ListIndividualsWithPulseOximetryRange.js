import { gql } from "@apollo/client";

const LIST_INDIVIDUALS_WITH_PULSE_OXIMETRY_RANGE = gql`
  query ListIndividuals {
    listIndividuals {
      items {
        id
        firstName
        lastName
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
  }
`;

export default LIST_INDIVIDUALS_WITH_PULSE_OXIMETRY_RANGE;
