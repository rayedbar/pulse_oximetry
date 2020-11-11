export const listIndividualsQuery = `query listIndividualsQuery {
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
  }`;
