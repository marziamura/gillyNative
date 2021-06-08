import {ADD_TREAT, 
        ADD_TREAT_EXPRESS,
        ADD_TREAT_TOUCH,
        ADD_TREAT_CONNECT} from "./messages";

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