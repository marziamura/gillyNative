import {SET_USER_INFO} from "./messages";

export default function actionSetPushNotificationToken(state, token){
  console.log("call to actionSetPushNotificationToken", state, token);
  return {
      type: SET_USER_INFO,
      payload: {
        state,
        newItem: [token]
     }
    
}
}