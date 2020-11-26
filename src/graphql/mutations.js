/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createIndividual = /* GraphQL */ `
  mutation CreateIndividual(
    $input: CreateIndividualInput!
    $condition: ModelIndividualConditionInput
  ) {
    createIndividual(input: $input, condition: $condition) {
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
export const updateIndividual = /* GraphQL */ `
  mutation UpdateIndividual(
    $input: UpdateIndividualInput!
    $condition: ModelIndividualConditionInput
  ) {
    updateIndividual(input: $input, condition: $condition) {
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
export const deleteIndividual = /* GraphQL */ `
  mutation DeleteIndividual(
    $input: DeleteIndividualInput!
    $condition: ModelIndividualConditionInput
  ) {
    deleteIndividual(input: $input, condition: $condition) {
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
export const createPulseOximetry = /* GraphQL */ `
  mutation CreatePulseOximetry(
    $input: CreatePulseOximetryInput!
    $condition: ModelPulseOximetryConditionInput
  ) {
    createPulseOximetry(input: $input, condition: $condition) {
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
export const updatePulseOximetry = /* GraphQL */ `
  mutation UpdatePulseOximetry(
    $input: UpdatePulseOximetryInput!
    $condition: ModelPulseOximetryConditionInput
  ) {
    updatePulseOximetry(input: $input, condition: $condition) {
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
export const deletePulseOximetry = /* GraphQL */ `
  mutation DeletePulseOximetry(
    $input: DeletePulseOximetryInput!
    $condition: ModelPulseOximetryConditionInput
  ) {
    deletePulseOximetry(input: $input, condition: $condition) {
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
export const createPulseOximetryRange = /* GraphQL */ `
  mutation CreatePulseOximetryRange(
    $input: CreatePulseOximetryRangeInput!
    $condition: ModelPulseOximetryRangeConditionInput
  ) {
    createPulseOximetryRange(input: $input, condition: $condition) {
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
export const updatePulseOximetryRange = /* GraphQL */ `
  mutation UpdatePulseOximetryRange(
    $input: UpdatePulseOximetryRangeInput!
    $condition: ModelPulseOximetryRangeConditionInput
  ) {
    updatePulseOximetryRange(input: $input, condition: $condition) {
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
export const deletePulseOximetryRange = /* GraphQL */ `
  mutation DeletePulseOximetryRange(
    $input: DeletePulseOximetryRangeInput!
    $condition: ModelPulseOximetryRangeConditionInput
  ) {
    deletePulseOximetryRange(input: $input, condition: $condition) {
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
export const createNotify = /* GraphQL */ `
  mutation CreateNotify(
    $input: CreateNotifyInput!
    $condition: ModelNotifyConditionInput
  ) {
    createNotify(input: $input, condition: $condition) {
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
export const updateNotify = /* GraphQL */ `
  mutation UpdateNotify(
    $input: UpdateNotifyInput!
    $condition: ModelNotifyConditionInput
  ) {
    updateNotify(input: $input, condition: $condition) {
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
export const deleteNotify = /* GraphQL */ `
  mutation DeleteNotify(
    $input: DeleteNotifyInput!
    $condition: ModelNotifyConditionInput
  ) {
    deleteNotify(input: $input, condition: $condition) {
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
