import { combineReducers } from 'redux'


import {
  SET_USER_INFO, 
  SET_TREAT,
  LOGIN_DATA,
  UPDATE_MESSAGE,
  SET_PUSH_NOTIFICATION_PREF,
  ADD_TREAT
} from './messages'

const user = [{
  id: "xxx",
  partnerID: null,
  userName: null,
  journey: "Solo",
  sex: "xxx",
  gender: "xxx",
  primary: true,
  registered: false,
  todaysTreatDone: false,
  lastTreatInJourney: 0,
  pushNotificationToken: "",
  lastActiveDay: 0,
  partnerName: "your partner",
  coupleId: null,
}]
const login =[{
  email: null,
  password: null
}]

const message =[{
  partnerName: "Your partner",
  name: "",
  answer: ""
}]

const treat = [{
  id: null,
  description: "",
  toBeRefreshed: true,
  journey: "",
  nb: null,
}]

const treatList =  [
];

const pushPreferences =[{
  consent : "None"
}]

const treatCat = [
  [{type:"text", description:"SixSeconds in Heaven", id: "A"},{type:"icon", id:"AA", status:1}, {type:"icon", id:"AB", status:0}, {type:"icon", id:"AC", status:2}],
  [{type:"text", description:"SixSeconds in Heaven", id: "A"},{type:"icon", id:"AA", status:1}, {type:"icon", id:"AB", status:0}, {type:"icon", id:"AC", status:2}],
  [{type:"text", description:"SixSeconds in Heaven", id: "A"},{type:"icon", id:"AA", status:1}, {type:"icon", id:"AB", status:0}, {type:"icon", id:"AC", status:2}],
  [{type:"text", description:"SixSeconds in Heaven", id: "A"},{type:"icon", id:"AA", status:1}, {type:"icon", id:"AB", status:0}, {type:"icon", id:"AC", status:2}],
];

const userInfo = (state = user, action) => {
    
    if(action.type === SET_USER_INFO){
      state[0].id = action.payload.newItem[0].id || state[0].id;
      state[0].partnerID = action.payload.newItem[0].partnerID || state[0].partnerID;
      state[0].userName = action.payload.newItem[0].userName || state[0].userName;
      state[0].partnerName = action.payload.newItem[0].partnerName || state[0].partnerName;
      state[0].journey = action.payload.newItem[0].journey || state[0].journey;
      state[0].sex = action.payload.newItem[0].sex || state[0].sex;
      state[0].gender = action.payload.newItem[0].gender || state[0].gender;
      state[0].partnerID = action.payload.newItem[0].partnerID || state[0].partnerID;
      state[0].registered = action.payload.newItem[0].registered || state[0].registered;
      state[0].email = action.payload.newItem[0].email || state[0].email; 
      state[0].password = action.payload.newItem[0].password || state[0].password; 
      state[0].lastTreatInJourney = action.payload.newItem[0].currentDayInJourney || state[0].lastTreatInJourney;
      state[0].todaysTreatDone = action.payload.newItem[0].todaysTreatDone || state[0].todaysTreatDone;
      state[0].pushNotificationToken = action.payload.newItem[0].pushNotificationToken || state[0].pushNotificationToken;
      state[0].lastActiveDay=action.payload.newItem[0].lastActiveDay || state[0].lastActiveDay;
      state[0].lastTreatInJourney=action.payload.newItem[0].lastTreatInJourney || state[0].lastTreatInJourney;
      state[0].coupleId=action.payload.newItem[0].coupleId || state[0].coupleId;

      const a = [...state];
      console.log("reducer userInfo ", state[0],  state[0].coupleId);
    }

  return [...state];
}

const loginData = (state = login, action) => {
  //console.log("call to reducer messageInABottle", state[0], action.payload);
  switch (action.type) {
    case LOGIN_DATA:
      state[0].email = action.payload.newItem[0].email;
      state[0].password = action.payload.newItem[0].password;
      return [...state,];
    default:
      return  state; 
  }
}

const messageInABottle = (state = message, action) => {
  //console.log("call to reducer messageInABottle", state[0], action.payload);
  switch (action.type) {
    case UPDATE_MESSAGE:
      state[0].partnerName = action.payload.newItem[0].partnerName;
      state[0].answer = action.payload.newItem[0].answer;
      state[0].name = action.payload.newItem[0].name;
      return [...state,];
    default:
      return  state; 
  }
}

const currentTreat = (state = treat, action) => {
  switch (action.type) {
    case SET_TREAT:
      state[0].id = action.payload.newItem[0].id;
      state[0].description = action.payload.newItem[0].description;
      state[0].journey = action.payload.newItem[0].journey;
      return [...state,];
    default:
      return  state; 
  }
}

const pushNotificationPreferences = (state = pushPreferences, action) => {
  
 // console.log("call to reducer pushNotificationPreferences action.payload", action);
  switch (action.type) {
    case SET_PUSH_NOTIFICATION_PREF :
      state[0].consent = action.payload.newItem[0].consent;
  
      return [...state];
    default:
  
      return  state; 
  }
}

const treatsCache = (state = treatList, action) => {
  switch (action.type) {
    case ADD_TREAT:
      state.push(action.payload.newItem);
      return [...state,];
    default:
      return  state; 
  }
}

const treatsCat = (state = treatCat, action) => {
      return  state; 
}

const rootReducer = combineReducers({userInfo, messageInABottle, currentTreat,
                                     pushNotificationPreferences,
                                     treatsCache,
                                     loginData,
                                     treatsCat});

export default rootReducer;