import {SET_USER_INFO} from "./messages";

export default function actionSetUserInfo(state, newItem){
  console.log("call to actionSetUserInfo state", state);
  console.log("call to actionSetUserInfo newItem", newItem);

  return {
      type: SET_USER_INFO,
      payload: {
        state,
        newItem
     }
    
}
}