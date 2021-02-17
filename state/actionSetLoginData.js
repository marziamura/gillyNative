import {USER_LOGIN_DATA} from "./messages";

export default function actionSetLoginData(state, newItem){
  console.log("call to actionUserLogin", state, newItem);
  return {
      type: USER_LOGIN_DATA,
      payload: {
        state,
        newItem
     }
    
}
}