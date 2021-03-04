import { combineReducers } from 'redux'
import {USER_LOGIN} from './messages'
import {USER_LOGOUT} from './messages'
import {SET_USER_INFO} from './messages'
import {USER_LOGIN_DATA} from './messages'
import {USER_REGISTERED} from './messages'
import {UPDATE_MESSAGE}  from './messages'
import {UPDATE_JOURNEY_STATUS}  from './messages'
import {SET_PUSH_NOTIFICATION_TOKEN}  from './messages'

const user = [{
  id: "xxx",
  partnerID: "zzzz",
  userName: "xxxxx",
  journey: "zzzzz",
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
}]

const message =[{
  partnerName: "Your partner",
  message: ""
}]

const userInfo = (state = user, action) => {
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
          state[0].registered = true;
          state[0].lastTreatInJourney = action.payload.newItem[0].currentDayInJourney;
          state[0].todaysTreatDone = action.payload.newItem[0].todaysTreatDone;
          break;
        case SET_PUSH_NOTIFICATION_TOKEN:
          state[0].pushNotificationToken = action.payload.newItem;
          break;
        default:
          break;
      }
      return [...state];
}

const messageInABottle = (state = message, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      state[0].partnerName = action.payload.newItem[0].partnerName;
      state[0].message = action.payload.newItem[0].answer;
      return [...state,];
    default:
      return  state; 
  }
}

const rootReducer = combineReducers({userInfo, messageInABottle});

export default rootReducer;