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
export const onUpdateIndividual = /* GraphQL */ `
  subscription OnUpdateIndividual($owner: String!) {
    onUpdateIndividual(owner: $owner) {
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
export const onDeleteIndividual = /* GraphQL */ `
  subscription OnDeleteIndividual($owner: String!) {
    onDeleteIndividual(owner: $owner) {
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
export const onCreateOximeter = /* GraphQL */ `
  subscription OnCreateOximeter($owner: String!) {
    onCreateOximeter(owner: $owner) {
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
export const onUpdateOximeter = /* GraphQL */ `
  subscription OnUpdateOximeter($owner: String!) {
    onUpdateOximeter(owner: $owner) {
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
export const onDeleteOximeter = /* GraphQL */ `
  subscription OnDeleteOximeter($owner: String!) {
    onDeleteOximeter(owner: $owner) {
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
export const onCreateNotify = /* GraphQL */ `
  subscription OnCreateNotify($owner: String!) {
    onCreateNotify(owner: $owner) {
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
export const onUpdateNotify = /* GraphQL */ `
  subscription OnUpdateNotify($owner: String!) {
    onUpdateNotify(owner: $owner) {
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
export const onDeleteNotify = /* GraphQL */ `
  subscription OnDeleteNotify($owner: String!) {
    onDeleteNotify(owner: $owner) {
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
