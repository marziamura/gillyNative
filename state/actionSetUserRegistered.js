import {SET_USER_INFO} from "./messages";

export default function actionSetUserRegistered(state){
  console.log("call to actionSetUserRegistered", state);
  return {
      type: SET_USER_INFO,
      payload: {
        state,
        newItem: {registed: true}
     }
    
}
}