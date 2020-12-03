import { gql } from "@apollo/client";

const BuildGetIndividualQuery = ({
  includeIndividualInfo,
  includePulseOximetry,
  includePulseOximetryRange,
}) => {
  let query = `query GetIndividual($id: ID!) {
        getIndividual(id: $id) {
          id
          `;
  if (includePulseOximetry) {
    query = `query GetIndividual($id: ID!, $pulseOximetryLimit: Int) {
              getIndividual(id: $id) {
                id
                `;
  }
  if (includeIndividualInfo) {
    query =
      query +
      `
        firstName
        lastName
        gender
        dob
        `;
  }
  if (includePulseOximetry) {
    query =
      query +
      `pulseOximetry(limit: $pulseOximetryLimit, sortDirection: DESC) {
        items {
          id
          createdAt
          spO2
          heartRate
        }
        nextToken
      }
      `;
  }
  if (includePulseOximetryRange) {
    query =
      query +
      `pulseOximetryRange(limit: 1, sortDirection: DESC) {
          items {
            id
            minSpO2
            minHeartRate
            maxHeartRate
          }
        }
        `;
  }
  query =
    query +
    `createdAt
     updatedAt
    }
}
`;
  return gql(query);
};

export default BuildGetIndividualQuery;
