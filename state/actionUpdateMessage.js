import {UPDATE_MESSAGE} from "./messages";

export default function actionUpdateMessage(state, newItem){
  console.log("call to actionUpdateMessage", newItem);
  return {
      type: UPDATE_MESSAGE,
      payload: {
        state,
        newItem
     }
    
}
}