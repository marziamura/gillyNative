import {USER_LOGIN} from "./messages";

export default function actionUserLogin(state, newItem){
  console.log("call to actionUserLogin", state, newItem);
  return {
      type: USER_LOGIN,
      payload: {
        state,
        newItem
     }
    
}
}