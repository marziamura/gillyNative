import {SET_TREAT} from "./messages";

export default function actionSetTreatData(newItem){
  console.log("call to actionSetTreatData", newItem);
  return {
      type: SET_TREAT,
      payload: {
        newItem
     }
    
}
}