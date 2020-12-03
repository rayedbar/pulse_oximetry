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
  query GetIndividual(
    $id: ID!
    $pulseOximetrySortDirection: ModelSortDirection = DESC
    $pulseOximetryRangeSortDirection: ModelSortDirection = DESC
  ) {
    getIndividual(id: $id) {
      id
      firstName
      lastName
      gender
      dob
      pulseOximetry(sortDirection: $pulseOximetrySortDirection) {
        items {
          id
          spO2
          heartRate
          createdAt
          range
        }
      }
      pulseOximetryRange(
        limit: 1
        sortDirection: $pulseOximetryRangeSortDirection
      ) {
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

export const getPulseOximetryRangeByIndividual = gql`
  query GetPulseOximetryRange($id: ID!) {
    getPulseOximetryRange(id: $id) {
      id
      individualID
      minSpO2
      minHeartRate
      maxHeartRate
      createdAt
      updatedAt
      owner
    }
  }
`;
