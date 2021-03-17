import {SET_USER_INFO} from "./messages";

export default function actionUpdateJourneyStatus(state, newItem){
  console.log("call to actionUpdateJourneyStatus",newItem);
  return {
      type: SET_USER_INFO,
      payload: {
        state,
        newItem
     }
    
}
}