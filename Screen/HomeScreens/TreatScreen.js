// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import createStore from '../../state/store';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';



console.log("loading TreatScreen");



const TreatScreen = () => {
    let store = createStore(); 
    const treatData = store.getState().currentTreat[0];   
    const user = store.getState().userInfo[0]; 

    

    
    var partnerName = "your partner";
    var source = "https://getgilly.typeform.com/to/";
    var params =   'partner=' + partnerName
                + '&pname=' + "" 
                + '&userid=' + user.id 
                + '&firstname=' + user.name
                + '&puserid=' + user.partnerID
                + "&email=" + user.email
                + "&journey=" + user.journey;
    const typeformLink = source + treatData.id + "#" + params;// + "&" + previousAnswers;
    console.log("TypeFormLink ", typeformLink);
    
   
  return (
    <React.Fragment>
     { window.location && <Text>
          {typeformLink}
      </Text>
     }
        <WebView   source={{ uri: typeformLink }} 
        style={styles.html}/>    
     
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
  
    },
    html: {
      marginTop: 20,
      maxHeight: '100%',
      width: '100%'
    }
  });

export default TreatScreen;