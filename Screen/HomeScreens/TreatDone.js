import React from 'react';
import TextScreen from '../Components/TextScreen';


const TreatDone = ({navigation}) => {
 

  return (
    <TextScreen namespace="wellDone" next={"HomeScreen"} navigation={navigation}/>
  );
};

export default TreatDone
;
