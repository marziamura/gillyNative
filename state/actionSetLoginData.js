import {SET_USER_INFO} from "./messages";

export default function actionSetLoginData(state, newItem){
  console.log("call to actionUserLogin", state, newItem);
  return {
      type: SET_USER_INFO,
      payload: {
        state,
        newItem
     }
    
}
}