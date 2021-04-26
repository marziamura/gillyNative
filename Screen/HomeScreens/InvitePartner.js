// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';

import WebViewScreen from '../Components/WebViewScreen';
import createStore from '../../state/store';




console.log("loading TreatScreen");



const InvitePartner = ({navigation}) => {
  const store = createStore();
  const user = store.getState().userInfo[0]; 

  var params = '&userid=' + user.id 
  var emailDomain = user.email
  const typeformLink = "https://getgilly.typeform.com/to/Hy3dvuwt" + params;
  console.log("TypeFormLink ->", typeformLink);
  return <WebViewScreen url={typeformLink} navigation={navigation} afterSubmission={"ThankYou"}/>
};



export default InvitePartner;