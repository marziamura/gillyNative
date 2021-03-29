import {SET_PUSH_NOTIFICATION_PREF} from "./messages";

export default function actionSetPushNotificationPreferences(state, token){
  console.log("call to actionSetPushNotificationPreferences", state, token);
  return {
      type: SET_PUSH_NOTIFICATION_PREF,
      payload: {
        state,
        newItem: token
     }
    
}
}