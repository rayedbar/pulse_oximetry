export const listIndividualsWithLatestPulseOximetry = /* GraphQL */ `
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
export const getIndividualWithPulseOximetryCreatedAtDESC = /* GraphQL */ `
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

export const listIndividualsWithPulseOximetryRange = /* GraphQL */ `
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
