import { gql } from "@apollo/client";

const GET_PULSE_OXIMETRY = gql`
  query GetIndividual(
    $id: ID!
    $limit: Int
    $sortDirection: ModelSortDirection = DESC
  ) {
    getIndividual(id: $id) {
      id
      pulseOximetry(limit: $limit, sortDirection: $sortDirection) {
        items {
          id
          createdAt
          spO2
          heartRate
        }
        nextToken
      }
    }
  }
`;

export default GET_PULSE_OXIMETRY;
