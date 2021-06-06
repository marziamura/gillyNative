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

export function actionAddTreatExpress(state, newItem){
  console.log("call to actionAddTreatExpress", state, newItem);
  return {
      type: ADD_TREAT_EXPRESS,
      payload: {
        state,
        newItem
     }
    
}
}

export function actionAddTreatTouch(state, newItem){
  console.log("call to actionAddTreatTouch", state, newItem);
  return {
      type: ADD_TREAT_TOUCH,
      payload: {
        state,
        newItem
     }
    
}
}

export function actionAddTreatConnect(state, newItem){
  console.log("call to actionAddTreatConnect", state, newItem);
  return {
      type: ADD_TREAT_CONNECT,
      payload: {
        state,
        newItem
     }
    
}
}