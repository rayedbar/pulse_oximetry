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
      pulseOximetry {
        items {
          id
          individualID
          spO2
          heartRate
          createdAt
          range
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
        pulseOximetry {
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
export const getPulseOximetry = /* GraphQL */ `
  query GetPulseOximetry($id: ID!) {
    getPulseOximetry(id: $id) {
      id
      individualID
      spO2
      heartRate
      createdAt
      range
      updatedAt
      owner
    }
  }
`;
export const listPulseOximetrys = /* GraphQL */ `
  query ListPulseOximetrys(
    $filter: ModelPulseOximetryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPulseOximetrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        individualID
        spO2
        heartRate
        createdAt
        range
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
export const getAlertRecipient = /* GraphQL */ `
  query GetAlertRecipient($id: ID!) {
    getAlertRecipient(id: $id) {
      id
      owner
      firstName
      lastName
      email
      phone
      createdAt
      updatedAt
    }
  }
`;
export const listAlertRecipients = /* GraphQL */ `
  query ListAlertRecipients(
    $filter: ModelAlertRecipientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlertRecipients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        firstName
        lastName
        email
        phone
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
