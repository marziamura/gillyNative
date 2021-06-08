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
      pushNotificationToken
      timeZoneOffset
      coupleId
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
        pushNotificationToken
        timeZoneOffset
        coupleId
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
      nextToken
    }
  }
`;
export const getFormIdByWeek = /* GraphQL */ `
  query GetFormIdByWeek($id: ID!) {
    getFormIdByWeek(id: $id) {
      id
      week
      p1formId
      p2formId
      p3formId
      refformId
      category
      hformId
      description
      min1
      min2
      min3
      clothes1
      clothes2
      clothes3
      createdAt
      updatedAt
    }
  }
`;
export const listFormIdByWeeks = /* GraphQL */ `
  query ListFormIdByWeeks(
    $filter: ModelformIdByWeekFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormIdByWeeks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        week
        p1formId
        p2formId
        p3formId
        refformId
        category
        hformId
        description
        min1
        min2
        min3
        clothes1
        clothes2
        clothes3
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRegisteredEmail = /* GraphQL */ `
  query GetRegisteredEmail($id: ID!) {
    getRegisteredEmail(id: $id) {
      id
      email
      primary
      createdAt
      updatedAt
    }
  }
`;
export const listRegisteredEmails = /* GraphQL */ `
  query ListRegisteredEmails(
    $filter: ModelregisteredEmailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegisteredEmails(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        primary
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCouple = /* GraphQL */ `
  query GetCouple($id: String!) {
    getCouple(id: $id) {
      id
      partnerAId
      partnerBId
      createdAt
      updatedAt
    }
  }
`;
export const listCouples = /* GraphQL */ `
  query ListCouples(
    $id: String
    $filter: ModelcoupleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCouples(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        partnerAId
        partnerBId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTreatStatus = /* GraphQL */ `
  query GetTreatStatus($userId: String!, $formId: String!) {
    getTreatStatus(userId: $userId, formId: $formId) {
      userId
      formId
      status
      createdAt
      updatedAt
    }
  }
`;
export const listTreatStatuss = /* GraphQL */ `
  query ListTreatStatuss(
    $userId: String
    $formId: ModelStringKeyConditionInput
    $filter: ModeltreatStatusFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTreatStatuss(
      userId: $userId
      formId: $formId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        formId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
