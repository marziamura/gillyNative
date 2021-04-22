// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';

import WebViewScreen from '../Components/WebViewScreen';



console.log("loading ExploreJourneys");



const ExploreJourneys = ({navigation}) => {

  const typeformLink = "https://getgilly.typeform.com/to/OtrKn0BU"
  console.log("TypeFormLink ->", typeformLink);
  return <WebViewScreen url={typeformLink}/>
};



export default ExploreJourneys;