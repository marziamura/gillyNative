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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFormSubmission = /* GraphQL */ `
  subscription OnCreateFormSubmission {
    onCreateFormSubmission {
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
export const onUpdateFormSubmission = /* GraphQL */ `
  subscription OnUpdateFormSubmission {
    onUpdateFormSubmission {
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
export const onDeleteFormSubmission = /* GraphQL */ `
  subscription OnDeleteFormSubmission {
    onDeleteFormSubmission {
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
export const onCreateFormId = /* GraphQL */ `
  subscription OnCreateFormId {
    onCreateFormId {
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
export const onUpdateFormId = /* GraphQL */ `
  subscription OnUpdateFormId {
    onUpdateFormId {
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
export const onDeleteFormId = /* GraphQL */ `
  subscription OnDeleteFormId {
    onDeleteFormId {
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
export const onCreateSharedAnswered = /* GraphQL */ `
  subscription OnCreateSharedAnswered {
    onCreateSharedAnswered {
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
export const onUpdateSharedAnswered = /* GraphQL */ `
  subscription OnUpdateSharedAnswered {
    onUpdateSharedAnswered {
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
export const onDeleteSharedAnswered = /* GraphQL */ `
  subscription OnDeleteSharedAnswered {
    onDeleteSharedAnswered {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateDummy = /* GraphQL */ `
  subscription OnCreateDummy {
    onCreateDummy {
      id
      boh
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDummy = /* GraphQL */ `
  subscription OnUpdateDummy {
    onUpdateDummy {
      id
      boh
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDummy = /* GraphQL */ `
  subscription OnDeleteDummy {
    onDeleteDummy {
      id
      boh
      createdAt
      updatedAt
    }
  }
`;
