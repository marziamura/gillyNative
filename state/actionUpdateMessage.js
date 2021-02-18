import {UPDATE_MESSAGE} from "./messages";

export default function actionUpdateMessage(newItem){
  console.log("call to actionUpdateMessage", newItem);
  return {
      type: UPDATE_MESSAGE,
      payload: {
        newItem
     }
    
}
}