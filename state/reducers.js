import { combineReducers } from 'redux'

import {SET_USER_INFO} from './messages'
import {UPDATE_MESSAGE}  from './messages'
import {SET_TREAT}  from './messages'
import {SET_PUSH_NOTIFICATION_PREF} from './messages'


const user = [{
  id: "xxx",
  partnerID: "zzzz",
  userName: "xxxxx",
  journey: "Solo",
  sex: "xxx",
  gender: "xxx",
  partnerID: "xxx",
  email: "xxx",
  password: "xxx",
  primary: true,
  registered: false,
  todaysTreatDone: false,
  lastTreatInJourney: 0,
  pushNotificationToken: "",
  lastActiveDay: 0,
}]

const message =[{
  partnerName: "Your partner",
  name: "",
  answer: ""
}]

const treat = [{
  id: null,
  description: "",
  toBeRefreshed: true
}]

const pushPreferences =[{
  consent : "None"
}]

const userInfo = (state = user, action) => {
   console.log("call to reducer userInfo state", state[0]);
   console.log("call to reducer userInfo action.payload", action.payload);
    
    if(action.type === SET_USER_INFO){
      console.log("call to reducer userInfo 1", state[0], action.payload, action.payload.newItem[0].userName);
 //     console.log("call to reducer userInfo 2", action.payload.newItem[0].lastActiveDay);
      state[0].id = action.payload.newItem[0].id || state[0].id;
      state[0].partnerID = action.payload.newItem[0].partnerID || state[0].partnerID;
      state[0].userName = action.payload.newItem[0].userName || state[0].userName;
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
      const a = [...state];
 //     console.log("reducer userInfo ", state[0],  state[0].lastTreatInJourney);
    }

  return [...state];
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
      return [...state,];
    default:
      return  state; 
  }
}

const pushNotificationPreferences = (state = pushPreferences, action) => {
  console.log("call to reducer pushNotificationPreferences state", state)
  console.log("call to reducer pushNotificationPreferences action.payload", action);
  switch (action.type) {
    case SET_PUSH_NOTIFICATION_PREF :
      state[0].consent = action.payload.newItem[0];
      return [...state];
    default:
      console.log("call to reducer pushNotificationPreferences return default", state);
      return  state; 
  }
}

const rootReducer = combineReducers({userInfo, messageInABottle, currentTreat, pushNotificationPreferences});

export default rootReducer;