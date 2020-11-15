export const listIndividualsWithLatestPulseOximetry = /* GraphQL */ `
  query ListIndividuals {
    listIndividuals {
      items {
        id
        firstName
        lastName
        oximeter(limit: 1, sortDirection: DESC) {
          items {
            id
            createdAt
            spo2
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
      oximeter(sortDirection: DESC) {
        items {
          id
          spo2
          heartRate
          createdAt
        }
      }
    }
  }
`;
