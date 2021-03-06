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
export const createAlertRecipient = /* GraphQL */ `
  mutation CreateAlertRecipient(
    $input: CreateAlertRecipientInput!
    $condition: ModelAlertRecipientConditionInput
  ) {
    createAlertRecipient(input: $input, condition: $condition) {
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
export const updateAlertRecipient = /* GraphQL */ `
  mutation UpdateAlertRecipient(
    $input: UpdateAlertRecipientInput!
    $condition: ModelAlertRecipientConditionInput
  ) {
    updateAlertRecipient(input: $input, condition: $condition) {
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
export const deleteAlertRecipient = /* GraphQL */ `
  mutation DeleteAlertRecipient(
    $input: DeleteAlertRecipientInput!
    $condition: ModelAlertRecipientConditionInput
  ) {
    deleteAlertRecipient(input: $input, condition: $condition) {
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
