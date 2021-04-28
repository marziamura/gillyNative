import {SET_PUSH_NOTIFICATION_PREF} from "./messages";

export default function actionSetInitialPushNotificationPreferences(state, token){
  console.log("++++++++ call to actionSetInitialPushNotificationPreferences", state, token);

  let item = {consent:"None"}
  if( token && token[0].startsWith("ExponentPushToken"))
  {
    item.consent = "OK";
  }
  if(token && token[0] === "Deny"){
    item.consent = "Deny";
  }
  console.log("call to actionSetInitialPushNotificationPreferences", state, "#",token, "#"," #",item, "#");
  return {
      type: SET_PUSH_NOTIFICATION_PREF,
      payload: {
        state,
        newItem: [item]
     }  
  }
}