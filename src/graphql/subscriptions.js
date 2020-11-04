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
      updatedAt
      owner
    }
  }
`;
