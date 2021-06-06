/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      partnerID
      userName
      primary
      registered
      email
      tel
      activeDays
      lastActiveDay
      journey
      sex
      gender
      preferences
      partnerName
      pushNotificationToken
      timeZoneOffset
      coupleId
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      partnerID
      userName
      primary
      registered
      email
      tel
      activeDays
      lastActiveDay
      journey
      sex
      gender
      preferences
      partnerName
      pushNotificationToken
      timeZoneOffset
      coupleId
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      partnerID
      userName
      primary
      registered
      email
      tel
      activeDays
      lastActiveDay
      journey
      sex
      gender
      preferences
      partnerName
      pushNotificationToken
      timeZoneOffset
      coupleId
      createdAt
      updatedAt
    }
  }
`;
export const createFormSubmission = /* GraphQL */ `
  mutation CreateFormSubmission(
    $input: CreateFormSubmissionInput!
    $condition: ModelFormSubmissionConditionInput
  ) {
    createFormSubmission(input: $input, condition: $condition) {
      formId
      journey
      createdAt
      params
      refParams
      userId
      updatedAt
    }
  }
`;
export const updateFormSubmission = /* GraphQL */ `
  mutation UpdateFormSubmission(
    $input: UpdateFormSubmissionInput!
    $condition: ModelFormSubmissionConditionInput
  ) {
    updateFormSubmission(input: $input, condition: $condition) {
      formId
      journey
      createdAt
      params
      refParams
      userId
      updatedAt
    }
  }
`;
export const deleteFormSubmission = /* GraphQL */ `
  mutation DeleteFormSubmission(
    $input: DeleteFormSubmissionInput!
    $condition: ModelFormSubmissionConditionInput
  ) {
    deleteFormSubmission(input: $input, condition: $condition) {
      formId
      journey
      createdAt
      params
      refParams
      userId
      updatedAt
    }
  }
`;
export const createFormId = /* GraphQL */ `
  mutation CreateFormId(
    $input: CreateFormIdInput!
    $condition: ModelformIdConditionInput
  ) {
    createFormId(input: $input, condition: $condition) {
      day
      formId
      p1FormId
      p3FormId
      refFormId
      journey
      partner
      sameUser
      hformId
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateFormId = /* GraphQL */ `
  mutation UpdateFormId(
    $input: UpdateFormIdInput!
    $condition: ModelformIdConditionInput
  ) {
    updateFormId(input: $input, condition: $condition) {
      day
      formId
      p1FormId
      p3FormId
      refFormId
      journey
      partner
      sameUser
      hformId
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteFormId = /* GraphQL */ `
  mutation DeleteFormId(
    $input: DeleteFormIdInput!
    $condition: ModelformIdConditionInput
  ) {
    deleteFormId(input: $input, condition: $condition) {
      day
      formId
      p1FormId
      p3FormId
      refFormId
      journey
      partner
      sameUser
      hformId
      description
      createdAt
      updatedAt
    }
  }
`;
export const createFormIdByWeek = /* GraphQL */ `
  mutation CreateFormIdByWeek(
    $input: CreateFormIdByWeekInput!
    $condition: ModelformIdByWeekConditionInput
  ) {
    createFormIdByWeek(input: $input, condition: $condition) {
      id
      week
      p1formId
      p2FormId
      p3FormId
      refFormId
      category
      hformId
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateFormIdByWeek = /* GraphQL */ `
  mutation UpdateFormIdByWeek(
    $input: UpdateFormIdByWeekInput!
    $condition: ModelformIdByWeekConditionInput
  ) {
    updateFormIdByWeek(input: $input, condition: $condition) {
      id
      week
      p1formId
      p2FormId
      p3FormId
      refFormId
      category
      hformId
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteFormIdByWeek = /* GraphQL */ `
  mutation DeleteFormIdByWeek(
    $input: DeleteFormIdByWeekInput!
    $condition: ModelformIdByWeekConditionInput
  ) {
    deleteFormIdByWeek(input: $input, condition: $condition) {
      id
      week
      p1formId
      p2FormId
      p3FormId
      refFormId
      category
      hformId
      description
      createdAt
      updatedAt
    }
  }
`;
export const createRegisteredEmail = /* GraphQL */ `
  mutation CreateRegisteredEmail(
    $input: CreateRegisteredEmailInput!
    $condition: ModelregisteredEmailConditionInput
  ) {
    createRegisteredEmail(input: $input, condition: $condition) {
      id
      email
      primary
      createdAt
      updatedAt
    }
  }
`;
export const updateRegisteredEmail = /* GraphQL */ `
  mutation UpdateRegisteredEmail(
    $input: UpdateRegisteredEmailInput!
    $condition: ModelregisteredEmailConditionInput
  ) {
    updateRegisteredEmail(input: $input, condition: $condition) {
      id
      email
      primary
      createdAt
      updatedAt
    }
  }
`;
export const deleteRegisteredEmail = /* GraphQL */ `
  mutation DeleteRegisteredEmail(
    $input: DeleteRegisteredEmailInput!
    $condition: ModelregisteredEmailConditionInput
  ) {
    deleteRegisteredEmail(input: $input, condition: $condition) {
      id
      email
      primary
      createdAt
      updatedAt
    }
  }
`;
export const createCouple = /* GraphQL */ `
  mutation CreateCouple(
    $input: CreateCoupleInput!
    $condition: ModelcoupleConditionInput
  ) {
    createCouple(input: $input, condition: $condition) {
      id
      partnerAId
      partnerBId
      createdAt
      updatedAt
    }
  }
`;
export const updateCouple = /* GraphQL */ `
  mutation UpdateCouple(
    $input: UpdateCoupleInput!
    $condition: ModelcoupleConditionInput
  ) {
    updateCouple(input: $input, condition: $condition) {
      id
      partnerAId
      partnerBId
      createdAt
      updatedAt
    }
  }
`;
export const deleteCouple = /* GraphQL */ `
  mutation DeleteCouple(
    $input: DeleteCoupleInput!
    $condition: ModelcoupleConditionInput
  ) {
    deleteCouple(input: $input, condition: $condition) {
      id
      partnerAId
      partnerBId
      createdAt
      updatedAt
    }
  }
`;
