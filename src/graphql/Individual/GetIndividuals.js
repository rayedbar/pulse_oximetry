import { gql } from "@apollo/client";

const GET_INDIVIDUALS = gql`
  query GetIndividuals(
    $filter: ModelIndividualFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIndividuals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        gender
        dob
        pulseOximetry(limit: 1, sortDirection: DESC) {
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
        owner
      }
      nextToken
    }
  }
`;

export default GET_INDIVIDUALS;
