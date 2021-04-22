import React from 'react';
import TextScreen from '../Components/TextScreen';


const Thankyou = ({navigation}) => {
 

  return (
    <TextScreen namespace="thankYou" next={"HomeScreen"} navigation={navigation}/>
  );
};

export default Thankyou
;
