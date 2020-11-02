/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIndividual = /* GraphQL */ `
  query GetIndividual($id: ID!) {
    getIndividual(id: $id) {
      id
      firstName
      lastName
      gender
      dob
      oximeter {
        items {
          id
          individualID
          spo2
          heartRate
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listIndividuals = /* GraphQL */ `
  query ListIndividuals(
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
        oximeter {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getOximeter = /* GraphQL */ `
  query GetOximeter($id: ID!) {
    getOximeter(id: $id) {
      id
      individualID
      spo2
      heartRate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listOximeters = /* GraphQL */ `
  query ListOximeters(
    $filter: ModelOximeterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOximeters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        individualID
        spo2
        heartRate
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
