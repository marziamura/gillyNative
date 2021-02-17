import {UPDATE_JOURNEY_STATUS} from "./messages";

export default function actionUpdateJourneyStatus(newItem){
  console.log("call to actionUpdateJourneyStatus",newItem);
  return {
      type: UPDATE_JOURNEY_STATUS,
      payload: {
        newItem
     }
    
}
}