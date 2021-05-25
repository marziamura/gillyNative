import {ADD_TREAT} from "./messages";

export default function actionAddTreat(state, newItem){
  console.log("call to actionAddTreat", state, newItem);
  return {
      type: ADD_TREAT,
      payload: {
        state,
        newItem
     }
    
}
}