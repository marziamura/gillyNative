import {SET_USER_INFO} from "./messages";

export default function actionSetLoginData(state, newItem){
//  console.log("call to actionUserLogin", state, newItem);
  return {
      type: LOGIN_DATA,
      payload: {
        state,
        newItem
     }
    
}
}