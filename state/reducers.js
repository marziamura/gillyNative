import { combineReducers } from 'redux'
import {USER_LOGIN} from './messages'
import {USER_LOGOUT} from './messages'
import {SET_USER_INFO} from './messages'
import {USER_LOGIN_DATA} from './messages'
import {USER_REGISTERED} from './messages'

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
}]

const userInfo = (state = user, action) => {
      switch (action.type) {
        case USER_LOGIN:
          console.log("call to reducer authorizationStatus", action.payload);
          state[0].id = action.payload.newItem[0].id;
          state[0].partnerID = action.payload.newItem[0].partnerID;
          state[0].userName = action.payload.newItem[0].name;
          state[0].journey = action.payload.newItem[0].journey;
          state[0].journey = action.payload.newItem[0].email
          console.log("reducer USER_LOGIN ", ...state);
          return [...state];
        case USER_LOGOUT:
            state[0] = user;
            return [
              ...state,
            ]   
        case SET_USER_INFO:
          console.log("SET_USER_INFO", action.payload);
          state[0].sex = action.payload.newItem[0].sex;
          state[0].gender = action.payload.newItem[0].gender;
          state[0].journey = action.payload.newItem[0].journey;
          state[0].partnerID = action.payload.newItem[0].partnerID;
          state[0].registered = action.payload.newItem[0].registered;
          return [
            ...state,
          ]   
        case USER_LOGIN_DATA:
            console.log("USER_LOGIN_DATA", action.payload);
            state[0].email = action.payload.newItem[0].email; 
            state[0].password = action.payload.newItem[0].password;  
            return [
              ...state,
            ]
        case USER_REGISTERED:
          console.log("USER_REGISTERED", action.payload);
          state[0].registered = true;
          return [
            ...state,
          ]
        default:
          return state
      }
}


const rootReducer = combineReducers({userInfo});

export default rootReducer;