import {ADD_TREAT, 
        UPDATE_TREAT_EXPRESS,
        UPDATE_TREAT_TOUCH,
        UPDATE_TREAT_CONNECT} from "./messages";

import createStore from './store';

export default function actionUpdateTreatStatus(state, treatStatus){
  
  var globalState = createStore().getState();
  console.log("call to actionAddTreat", treatStatus);
  var currentType = ""
  if(treatStatus.category === "express"){
    currentType = UPDATE_TREAT_EXPRESS;
    state = globalState.treatsExpress;     
  }else
  if(treatStatus.category === "touch"){
    currentType = UPDATE_TREAT_TOUCH;
    state = globalState.treatsTouch; 
  }else
  if(treatStatus.category === "connect"){
    currentType = UPDATE_TREAT_CONNECT;
    state = globalState.treatsConnect; 
  }else{
    console.error("Invalid treat category");
  }

  
  return {
        type: currentType,
        payload: {
          state,
          treatStatus
      }
  }
    
}
