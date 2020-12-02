import { gql } from "@apollo/client";

const GET_INDIVIDUAL = gql`
  query GetIndividual($id: ID!, $limit: Int) {
    getIndividual(id: $id) {
      id
      firstName
      lastName
      gender
      dob
      pulseOximetry(limit: $limit, sortDirection: DESC) {
        items {
          id
          createdAt
          spO2
          heartRate
        }
        nextToken
      }
      pulseOximetryRange(limit: 1, sortDirection: DESC) {
        items {
          id
          minSpO2
          minHeartRate
          maxHeartRate
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default GET_INDIVIDUAL;
