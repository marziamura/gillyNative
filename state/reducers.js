import { combineReducers } from 'redux'
import * as treatsCategories from "../Screen/Components/treatsCategories"

import {
  SET_USER_INFO, 
  SET_TREAT,
  LOGIN_DATA,
  UPDATE_MESSAGE,
  SET_PUSH_NOTIFICATION_PREF,
  ADD_TREAT,
  ADD_TREAT_EXPRESS,
  ADD_TREAT_TOUCH,
  ADD_TREAT_CONNECT,
  UPDATE_TREAT_EXPRESS,
  UPDATE_TREAT_TOUCH,
  UPDATE_TREAT_CONNECT} from "./messages";

 

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
  category: treatsCategories.sUNDEFINED,
  nb: null,
}]

const treatList =  [
];

const pushPreferences =[{
  consent : "None"
}]

let treatsDataTouch =[];

let treatsDataExpress = [];

let treatsDataConnect = [];
/*
  {
   type: learn/solo/partner,
   id: typeForm Id, 
   status: 1/2/4, 
   min: min,
   category: TOUCH/CONNECT/EXPRESS
  };
*/
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
      state[0].category = action.payload.newItem[0].category;
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

function findTreatInList(treat, value){
  return treat.id === value;
}

const treatsTouch = (state = treatsDataTouch, action) => {

  switch (action.type) {
    case ADD_TREAT_TOUCH:
      console.log("State touch", state)
      treatsDataTouch = [...state, action.payload.newItem];
      state = treatsDataTouch;
      console.log("State touch 1", state)
      return [...state];
    case UPDATE_TREAT_TOUCH:
      var index = state.find(findTreatInList, action.treatStatus);
      state[index].status = action.treatStatus.status;
      return [...state];
    default:
      console.log("Returning List of treats ", state)
      return state;
  }
}
const treatsExpress = (state = treatsDataExpress, action) => {
  switch (action.type) {
    case ADD_TREAT_EXPRESS:
      treatsDataExpress = [...state, action.payload.newItem];
      state = treatsDataExpress;
      return [...state,];
    case UPDATE_TREAT_EXPRESS:
      var index = state.find(findTreatInList, action.treatStatus);
      state[index].status = action.treatStatus.status;
      return [...state];
    default:
      return state;
  }
}
const treatsConnect = (state = treatsDataConnect, action) => {
  console.log("Connect state ", state, treatsDataConnect);
  switch (action.type) {
    case ADD_TREAT_CONNECT:
      treatsDataConnect = [...state, action.payload.newItem];
      state = treatsDataConnect;
      console.log("Connect state ", state.length, state)
      return [...state,];
    case UPDATE_TREAT_CONNECT:
      var index = state.find(findTreatInList, action.treatStatus);
      state[index].status = action.treatStatus.status;
      return [...state];
    default:
      return  state;
  }
}

const rootReducer = combineReducers({userInfo, messageInABottle, currentTreat,
                                     pushNotificationPreferences,
                                     treatsCache,
                                     loginData,
                                     treatsTouch,
                                     treatsConnect,
                                     treatsExpress});

export default rootReducer;