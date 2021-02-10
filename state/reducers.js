import { combineReducers } from 'redux'
import {USER_LOGIN} from './messages'
import {USER_LOGOUT} from './messages'
import {SET_USER_INFO} from './messages'

const user = [{
  id: "xxx",
  partnerID: "zzzz",
  name: "xxxxx",
  journey: "zzzzz",
  sex: "xxx",
  gender: "xxx",
  partnerID: "xxx"
}]

const userInfo = (state = user, action) => {
      switch (action.type) {
        case USER_LOGIN:
          console.log("call to reducer authorizationStatus", action.payload);
          state[0].id = action.payload.newItem[0].id;
          state[0].partnerID = action.payload.newItem[0].partnerID;
          state[0].name = action.payload.newItem[0].name;
          state[0].journey = action.payload.newItem[0].journey;
          console.log("reducer USER_LOGIN ", ...state);
          return [...state];
        case USER_LOGOUT:
            state = action.payload.state;
            return [
              ...state,
            ]   
        case SET_USER_INFO:
          console.log("SET_USER_INFO", action.payload);
          state[0].sex = action.payload.newItem[0].sex;
          state[0].gender = action.payload.newItem[0].gender;
          state[0].journey = action.payload.newItem[0].journey;
          state[0].partnerID = action.payload.newItem[0].partnerID;
        default:
          return state
      }
}


const rootReducer = combineReducers({userInfo});

export default rootReducer;