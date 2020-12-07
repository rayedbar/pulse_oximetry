import { gql } from "@apollo/client";

const GET_INDIVIDUAL = gql`
  query GetIndividual($id: ID!) {
    getIndividual(id: $id) {
      id
      firstName
      lastName
      gender
      dob
    }
  }
`;
export default GET_INDIVIDUAL;
