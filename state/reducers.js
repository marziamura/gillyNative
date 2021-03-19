import { combineReducers } from 'redux'
import {SET_PUSH_NOTIFICATION_TOKEN, USER_LOGOUT} from './messages'
import {SET_USER_INFO} from './messages'
import {UPDATE_MESSAGE}  from './messages'
import {SET_TREAT}  from './messages'
import {USER_LOGIN} from './messages'
import {USER_LOGIN_DATA} from './messages'
import {USER_REGISTERED} from './messages'
import {UPDATE_JOURNEY_STATUS} from './messages'


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
/*
email: "xxx"
gender: "Man"
id: "0297903d-2406-4af8-a22f-cec087c1791a"
journey: "Solo"
partnerID: "a495b570-6342-402c-94b3-5c2e191fc08b"
primary: true
pushNotificationToken: ""
registered: true
sex: "Vulva"
userName: "Test1"
*/
/*
gender: "woman"
id: "4c8911ff-23e4-4a89-a877-36f0f217691b"
journey: "Solo"
partnerID: "a21605a8-ba69-4ba5-8193-d02cdd0b15a5"
primary: true
pushNotificationToken: ""
registered: true
sex: "vulva"
userName: "t110"
*/
const message =[{
  partnerName: "Your partner",
  message: ""
}]

const treat = [{
  id: null,
  description: ""
}]

/*const userInfo = (state = user, action) => {
  switch (action.type) {
    case USER_LOGIN:
      console.log("call to reducer authorizationStatus", action.payload);
      state[0].id = action.payload.newItem[0].id;
      state[0].partnerID = action.payload.newItem[0].partnerID;
      state[0].userName = action.payload.newItem[0].name;
      state[0].journey = action.payload.newItem[0].journey;
      console.log("reducer USER_LOGIN ", ...state);
      break;
    case USER_LOGOUT:
        state[0] = user;
       break;   
    case SET_USER_INFO:
      console.log("SET_USER_INFO", action.payload);
      state[0].sex = action.payload.newItem[0].sex;
      state[0].gender = action.payload.newItem[0].gender;
      state[0].journey = action.payload.newItem[0].journey;
      state[0].partnerID = action.payload.newItem[0].partnerID;
      state[0].registered = action.payload.newItem[0].registered;
      state[0].sex = action.payload.newItem[0].sex;
      state[0].gender = action.payload.newItem[0].gender;
      break; 
    case USER_LOGIN_DATA:
        console.log("USER_LOGIN_DATA", action.payload);
        state[0].email = action.payload.newItem[0].email; 
        state[0].password = action.payload.newItem[0].password;  
       break;
    case USER_REGISTERED:
      console.log("USER_REGISTERED", action.payload);
      state[0].registered = true;
      break;
    case UPDATE_JOURNEY_STATUS:  
       console.log("UPDATE_JOURNEY_STATUS", state, action.payload);
      state[0].registered = true;
      state[0].lastTreatInJourney = action.payload.newItem.currentDayInJourney;
      state[0].todaysTreatDone = action.payload.newItem.todaysTreatDone;
      console.log("UPDATE_JOURNEY_STATUS 2", state);
      break;
    case SET_PUSH_NOTIFICATION_TOKEN:
      state[0].pushNotificationToken = action.payload.newItem;
      break;
    default:
      break;
  }
  return [...state];
}*/
const userInfo = (state = user, action) => {
   console.log("call to reducer userInfo", state[0], action.payload);
    if(action.type === SET_USER_INFO){
      console.log("call to reducer userInfo 1", state[0], action.payload, action.payload.newItem[0].lastActiveDay);
      console.log("call to reducer userInfo 2", action.payload.newItem[0].lastActiveDay);
      state[0].id = action.payload.newItem[0].id || state[0].id;
      state[0].partnerID = action.payload.newItem[0].partnerID || state[0].partnerID;
      state[0].userName = action.payload.newItem[0].name || state[0].userName;
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
      console.log("reducer userInfo ", state[0],  state[0].lastTreatInJourney);
    }

  return [...state];
}

const messageInABottle = (state = message, action) => {
  //console.log("call to reducer messageInABottle", state[0], action.payload);
  switch (action.type) {
    case UPDATE_MESSAGE:
      state[0].partnerName = action.payload.newItem[0].partnerName;
      state[0].message = action.payload.newItem[0].answer;
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

const rootReducer = combineReducers({userInfo, messageInABottle, currentTreat});

export default rootReducer;