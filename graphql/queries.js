/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getFormSubmission = /* GraphQL */ `
  query GetFormSubmission($userId: String!, $formId: String!) {
    getFormSubmission(userId: $userId, formId: $formId) {
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
export const listFormSubmissions = /* GraphQL */ `
  query ListFormSubmissions(
    $userId: String
    $formId: ModelStringKeyConditionInput
    $filter: ModelFormSubmissionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFormSubmissions(
      userId: $userId
      formId: $formId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        formId
        journey
        createdAt
        params
        refParams
        userId
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFormId = /* GraphQL */ `
  query GetFormId($day: Int!, $journey: String!) {
    getFormId(day: $day, journey: $journey) {
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
export const listFormIds = /* GraphQL */ `
  query ListFormIds(
    $day: Int
    $journey: ModelStringKeyConditionInput
    $filter: ModelformIdFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFormIds(
      day: $day
      journey: $journey
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSharedAnswered = /* GraphQL */ `
  query GetSharedAnswered($originFormId: String!) {
    getSharedAnswered(originFormId: $originFormId) {
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
export const listSharedAnswereds = /* GraphQL */ `
  query ListSharedAnswereds(
    $originFormId: String
    $filter: ModelsharedAnsweredFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSharedAnswereds(
      originFormId: $originFormId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        originFormId
        sharedFormId
        question1
        answerRef1
        answerRef2
        answerRef3
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($author: String!) {
    getMessage(author: $author) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $author: String
    $filter: ModelmessageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMessages(
      author: $author
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        author
        isFirst
        previousMessage
        questionId
        read
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDummy = /* GraphQL */ `
  query GetDummy($id: ID!) {
    getDummy(id: $id) {
      id
      boh
      createdAt
      updatedAt
    }
  }
`;
export const listDummys = /* GraphQL */ `
  query ListDummys(
    $filter: ModeldummyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDummys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        boh
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
