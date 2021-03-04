import {SET_PUSH_NOTIFICATION_TOKEN} from "./messages";

export default function actionSetPushNotificationToken(token){
  console.log("call to actionSetPushNotificationToken");
  return {
      type: SET_PUSH_NOTIFICATION_TOKEN,
      payload: {
        newItem: token
     }
    
}
}