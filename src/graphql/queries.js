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
          pulseOximetryRange
          updatedAt
          owner
        }
        nextToken
      }
      pulseOximetryRange {
        items {
          id
          individualID
          minSpO2
          minHeartRate
          maxHeartRate
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
        pulseOximetryRange {
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
      pulseOximetryRange
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
        pulseOximetryRange
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPulseOximetryRange = /* GraphQL */ `
  query GetPulseOximetryRange($id: ID!) {
    getPulseOximetryRange(id: $id) {
      id
      individualID
      minSpO2
      minHeartRate
      maxHeartRate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPulseOximetryRanges = /* GraphQL */ `
  query ListPulseOximetryRanges(
    $filter: ModelPulseOximetryRangeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPulseOximetryRanges(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        individualID
        minSpO2
        minHeartRate
        maxHeartRate
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNotify = /* GraphQL */ `
  query GetNotify($id: ID!) {
    getNotify(id: $id) {
      id
      firstName
      lastName
      email
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listNotifys = /* GraphQL */ `
  query ListNotifys(
    $filter: ModelNotifyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
