import { gql } from "@apollo/client";

export const listIndividualsWithLatestPulseOximetry = gql`
  query ListIndividuals {
    listIndividuals {
      items {
        id
        firstName
        lastName
        pulseOximetry(limit: 1, sortDirection: DESC) {
          items {
            id
            createdAt
            spO2
            heartRate
          }
        }
      }
    }
  }
`;

export const getIndividualWithPulseOximetryCreatedAtDESC = gql`
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

export const listIndividualsWithPulseOximetryRange = gql`
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
