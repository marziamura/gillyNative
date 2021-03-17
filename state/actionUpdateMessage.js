import {SET_USER_INFO} from "./messages";

export default function actionUpdateMessage(state, newItem){
  console.log("call to actionUpdateMessage", newItem);
  return {
      type: SET_USER_INFO,
      payload: {
        state,
        newItem
     }
    
}
}