import {ADD_TREAT_CONNECT} from "./messages";

export default function actionAddTreatConnect(state, newItem){
  console.log("call to actionAddTreatExpress", state, newItem);
  return {
      type: ADD_TREAT_CONNECT,
      payload: {
        state,
        newItem
     }
    
}
}
