import { gql } from "@apollo/client";

const LIST_INDIVIDUALS = gql`
  query ListIndividuals($limit: Int, $nextToken: String) {
    listIndividuals(limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        pulseOximetry(limit: 1, sortDirection: DESC) {
          items {
            id
            spO2
            heartRate
            createdAt
          }
        }
        createdAt
      }
      nextToken
    }
  }
`;

export default LIST_INDIVIDUALS;
