// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';

import  WebViewScreen  from '../Components/WebViewScreen';
import createStore from '../../state/store';


console.log("loading TreatScreen");



const TreatScreen = () => {
    let store = createStore(); 
    const treatData = store.getState().currentTreat[0];   
    const user = store.getState().userInfo[0]; 
    
    var source = "https://getgilly.typeform.com/to/";
    var params = '&userid=' + user.id 
                + '&firstname=' + user.name
                + '&puserid=' + user.partnerID
                + "&email=" + user.email
                + "&journey=" + user.journey;
    const typeformLink = source + treatData.id + "#" + params;// + "&" + previousAnswers;
  //  const s = "http://app.getgilly.com/gth";
    console.log("TypeFormLink ->", typeformLink);
    
 
  return <WebViewScreen url={typeformLink}/>
     
};


export default TreatScreen;