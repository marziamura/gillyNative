/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFormSubmission = /* GraphQL */ `
  subscription OnCreateFormSubmission {
    onCreateFormSubmission {
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
export const onUpdateFormSubmission = /* GraphQL */ `
  subscription OnUpdateFormSubmission {
    onUpdateFormSubmission {
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
export const onDeleteFormSubmission = /* GraphQL */ `
  subscription OnDeleteFormSubmission {
    onDeleteFormSubmission {
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
export const onCreateFormId = /* GraphQL */ `
  subscription OnCreateFormId {
    onCreateFormId {
      day
      formId
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
export const onUpdateFormId = /* GraphQL */ `
  subscription OnUpdateFormId {
    onUpdateFormId {
      day
      formId
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
export const onDeleteFormId = /* GraphQL */ `
  subscription OnDeleteFormId {
    onDeleteFormId {
      day
      formId
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
export const onCreateRegisteredEmail = /* GraphQL */ `
  subscription OnCreateRegisteredEmail {
    onCreateRegisteredEmail {
      id
      email
      primary
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRegisteredEmail = /* GraphQL */ `
  subscription OnUpdateRegisteredEmail {
    onUpdateRegisteredEmail {
      id
      email
      primary
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRegisteredEmail = /* GraphQL */ `
  subscription OnDeleteRegisteredEmail {
    onDeleteRegisteredEmail {
      id
      email
      primary
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCouple = /* GraphQL */ `
  subscription OnCreateCouple {
    onCreateCouple {
      id
      partnerAId
      partnerBId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCouple = /* GraphQL */ `
  subscription OnUpdateCouple {
    onUpdateCouple {
      id
      partnerAId
      partnerBId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCouple = /* GraphQL */ `
  subscription OnDeleteCouple {
    onDeleteCouple {
      id
      partnerAId
      partnerBId
      createdAt
      updatedAt
    }
  }
`;
