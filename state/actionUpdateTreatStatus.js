import {UPDATE_TREAT_EXPRESS,
        UPDATE_TREAT_TOUCH,
        UPDATE_TREAT_CONNECT} from "./messages";
import * as treatCategories from "../Screen/Components/treatsCategories"
import createStore from './store';

export default function actionUpdateTreatStatus(state, treatStatus){
  
  var globalState = createStore().getState();
  console.log("call to actionUpdateTreatStatus", treatStatus);
  var currentType = ""
  if(treatStatus.category === treatCategories.EXPRESS){
    currentType = UPDATE_TREAT_EXPRESS;
    state = globalState.treatsExpress;     
  }else
  if(treatStatus.category === treatCategories.TOUCH){
    currentType = UPDATE_TREAT_TOUCH;
    state = globalState.treatsTouch; 
  }else
  if(treatStatus.category === treatCategories.CONNECT){
    currentType = UPDATE_TREAT_CONNECT;
    state = globalState.treatsConnect; 
  }else{
    console.error("Invalid treat category", treatStatus);
  }

  
  return {
        type: currentType,
        payload: {
          state,
          treatStatus
      }
  }
    
}
