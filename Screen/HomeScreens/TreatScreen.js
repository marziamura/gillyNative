// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';

import  WebViewScreen  from '../Components/WebViewScreen';
import createStore from '../../state/store';


console.log("loading TreatScreen");



const TreatScreen = ({navigation}) => {
    let store = createStore(); 
    const treatData = store.getState().currentTreat[0];   
    const user = store.getState().userInfo[0]; 
    console.log("Treat Screen", user);
    var source = "https://getgilly.typeform.com/to/";
    var params = '&userid=' + user.id 
                + '&firstname=' + user.userName
                + '&puserid=' + user.partnerID
                + "&email=" + user.email
                + "&journey=" + user.journey;
    const typeformLink = source + treatData.id + "#" + params;// + "&" + previousAnswers;
  //  const s = "http://app.getgilly.com/gth";
    console.log("TypeFormLink ->", typeformLink);
    
 
  return <WebViewScreen url={typeformLink} navigation={navigation} afterSubmission={"TreatDone"}/>
     
};


export default TreatScreen;