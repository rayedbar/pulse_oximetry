/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIndividual = /* GraphQL */ `
  subscription OnCreateIndividual($owner: String!) {
    onCreateIndividual(owner: $owner) {
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
export const onUpdateIndividual = /* GraphQL */ `
  subscription OnUpdateIndividual($owner: String!) {
    onUpdateIndividual(owner: $owner) {
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
export const onDeleteIndividual = /* GraphQL */ `
  subscription OnDeleteIndividual($owner: String!) {
    onDeleteIndividual(owner: $owner) {
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
export const onCreatePulseOximetry = /* GraphQL */ `
  subscription OnCreatePulseOximetry($owner: String!) {
    onCreatePulseOximetry(owner: $owner) {
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
export const onUpdatePulseOximetry = /* GraphQL */ `
  subscription OnUpdatePulseOximetry($owner: String!) {
    onUpdatePulseOximetry(owner: $owner) {
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
export const onDeletePulseOximetry = /* GraphQL */ `
  subscription OnDeletePulseOximetry($owner: String!) {
    onDeletePulseOximetry(owner: $owner) {
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
export const onCreatePulseOximetryRange = /* GraphQL */ `
  subscription OnCreatePulseOximetryRange($owner: String!) {
    onCreatePulseOximetryRange(owner: $owner) {
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
export const onUpdatePulseOximetryRange = /* GraphQL */ `
  subscription OnUpdatePulseOximetryRange($owner: String!) {
    onUpdatePulseOximetryRange(owner: $owner) {
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
export const onDeletePulseOximetryRange = /* GraphQL */ `
  subscription OnDeletePulseOximetryRange($owner: String!) {
    onDeletePulseOximetryRange(owner: $owner) {
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
export const onCreateAlertRecipient = /* GraphQL */ `
  subscription OnCreateAlertRecipient($owner: String!) {
    onCreateAlertRecipient(owner: $owner) {
      id
      owner
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAlertRecipient = /* GraphQL */ `
  subscription OnUpdateAlertRecipient($owner: String!) {
    onUpdateAlertRecipient(owner: $owner) {
      id
      owner
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAlertRecipient = /* GraphQL */ `
  subscription OnDeleteAlertRecipient($owner: String!) {
    onDeleteAlertRecipient(owner: $owner) {
      id
      owner
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;
