import React from 'react';
import TextScreen from '../Components/TextScreen';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import createStore from '../../state/store';
import actionUpdateTreatStatus from '../../state/actionUpdateTreatStatus';
import * as statusCodes from '../Components/statusCodes'



const TreatDone = ({navigation}) => {
  let store = createStore();
  const user = store.getState().userInfo[0];
  const treatData = store.getState().currentTreat[0];   
  
  React.useEffect(()=>{     
    console.log("Updating treat data... ", user)
    const toBeSavedData = {
      userId: user.id,
      formId: treatData.id,
      status: statusCodes.COMPLETED,
    }
    API.graphql(graphqlOperation(mutations.updateTreatStatus,{input: toBeSavedData})).then((data)=>{
      console.log("Treat Status was updated ", data);
      toBeSavedData.category = treatData.journey;
      console.log("Saving Locally ", toBeSavedData);
      store.dispatch(actionUpdateTreatStatus(toBeSavedData));
      return (true)
    }).catch( error =>{
      console.log(error);
      return false;
    })
},[treatData])

  return (
    <TextScreen namespace="wellDone" next={"HomeScreen"} navigation={navigation}/>
  );
};

export default TreatDone
;
