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
      id
      formId
      journey
      createdAt
      params
      refParams
      userId
      sharedAnswered {
        originFormId
        sharedFormId
        question1
        answerRef1
        answerRef2
        answerRef3
        createdAt
        updatedAt
      }
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
      id
      formId
      journey
      createdAt
      params
      refParams
      userId
      sharedAnswered {
        originFormId
        sharedFormId
        question1
        answerRef1
        answerRef2
        answerRef3
        createdAt
        updatedAt
      }
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
      id
      formId
      journey
      createdAt
      params
      refParams
      userId
      sharedAnswered {
        originFormId
        sharedFormId
        question1
        answerRef1
        answerRef2
        answerRef3
        createdAt
        updatedAt
      }
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
      refFormId
      sharedFormId
      journey
      partner
      sameUser
      hformId
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
      refFormId
      sharedFormId
      journey
      partner
      sameUser
      hformId
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
      refFormId
      sharedFormId
      journey
      partner
      sameUser
      hformId
      createdAt
      updatedAt
    }
  }
`;
export const createSharedAnswered = /* GraphQL */ `
  mutation CreateSharedAnswered(
    $input: CreateSharedAnsweredInput!
    $condition: ModelsharedAnsweredConditionInput
  ) {
    createSharedAnswered(input: $input, condition: $condition) {
      originFormId
      sharedFormId
      question1
      answerRef1
      answerRef2
      answerRef3
      givenAnswers {
        id
        formId
        journey
        createdAt
        params
        refParams
        userId
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSharedAnswered = /* GraphQL */ `
  mutation UpdateSharedAnswered(
    $input: UpdateSharedAnsweredInput!
    $condition: ModelsharedAnsweredConditionInput
  ) {
    updateSharedAnswered(input: $input, condition: $condition) {
      originFormId
      sharedFormId
      question1
      answerRef1
      answerRef2
      answerRef3
      givenAnswers {
        id
        formId
        journey
        createdAt
        params
        refParams
        userId
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSharedAnswered = /* GraphQL */ `
  mutation DeleteSharedAnswered(
    $input: DeleteSharedAnsweredInput!
    $condition: ModelsharedAnsweredConditionInput
  ) {
    deleteSharedAnswered(input: $input, condition: $condition) {
      originFormId
      sharedFormId
      question1
      answerRef1
      answerRef2
      answerRef3
      givenAnswers {
        id
        formId
        journey
        createdAt
        params
        refParams
        userId
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelmessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      author
      isFirst
      previousMessage
      questionId
      read
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelmessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      author
      isFirst
      previousMessage
      questionId
      read
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelmessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      author
      isFirst
      previousMessage
      questionId
      read
      createdAt
      updatedAt
    }
  }
`;
export const createDummy = /* GraphQL */ `
  mutation CreateDummy(
    $input: CreateDummyInput!
    $condition: ModeldummyConditionInput
  ) {
    createDummy(input: $input, condition: $condition) {
      id
      boh
      createdAt
      updatedAt
    }
  }
`;
export const updateDummy = /* GraphQL */ `
  mutation UpdateDummy(
    $input: UpdateDummyInput!
    $condition: ModeldummyConditionInput
  ) {
    updateDummy(input: $input, condition: $condition) {
      id
      boh
      createdAt
      updatedAt
    }
  }
`;
export const deleteDummy = /* GraphQL */ `
  mutation DeleteDummy(
    $input: DeleteDummyInput!
    $condition: ModeldummyConditionInput
  ) {
    deleteDummy(input: $input, condition: $condition) {
      id
      boh
      createdAt
      updatedAt
    }
  }
`;
