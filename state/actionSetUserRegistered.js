import {USER_LOGIN_DATA} from "./messages";

export default function actionSetUserRegistered(){
  console.log("call to actionSetUserRegistered");
  return {
      type: USER_LOGIN_DATA,
      payload: {
        newItem: {registed: true}
     }
    
}
}