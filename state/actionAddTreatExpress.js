import {ADD_TREAT_EXPRESS} from "./messages";

export default function actionAddTreatExpress(state, newItem){
  console.log("call to actionAddTreatExpress", state, newItem);
  return {
      type: ADD_TREAT_EXPRESS,
      payload: {
        state,
        newItem
     }
    
}
}
