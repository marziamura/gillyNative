import {ADD_TREAT_TOUCH} from "./messages";

export default function actionAddTreatTouch(state, newItem){
  console.log("call to actionAddTreatTouch", state, newItem);
  return {
      type: ADD_TREAT_TOUCH,
      payload: {
        state,
        newItem
     }
    
}
}
