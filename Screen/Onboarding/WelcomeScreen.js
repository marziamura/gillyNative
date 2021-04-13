import React from 'react';
import TextScreen from '../Components/TextScreen';


const WelcomeScreen = (props) => {
 

  return (
    <TextScreen namespace="Welcome" next="Gender" navigation={props.navigation}/>
  );
};

export default WelcomeScreen;
