import {SET_USER_INFO} from "./messages";

export default function actionSetPushNotificationToken(state, userInfo){
  console.log("call to actionSetPushNotificationToken", state, userInfo);
  return {
      type: SET_USER_INFO,
      payload: {
        state,
        newItem: userInfo
     }
    
}
}