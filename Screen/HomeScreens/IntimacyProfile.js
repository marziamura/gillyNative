// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';

import WebViewScreen from '../Components/WebViewScreen';
import createStore from '../../state/store';




console.log("loading TreatScreen");



const IntimacyProfile = ({navigation}) => {

  const typeformLink = "https://getgilly.typeform.com/to/OOjWeGZy"
  console.log("TypeFormLink ->", typeformLink);
  return <WebViewScreen url={typeformLink}/>
};



export default IntimacyProfile;