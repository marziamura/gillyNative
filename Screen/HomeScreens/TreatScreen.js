// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import createStore from '../../state/store';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {getJourneyInfo} from '../../state/getUserInfo';




console.log("loading TreatScreen");



const TreatScreen = () => {
    const [typeformLink, setTypeFormLink] = React.useState(null);
    const [dailyFormId, setFormId] = React.useState();
    const [refFormId, setRefFormId] = React.useState();
    let store = createStore();
    const user = store.getState().userInfo[0];
    const [day, setDay] = React.useState(user.lastTreatInJourney);

  

    
    console.log("TreatScreen", user);
    console.log("TreatScreen", store.getState());
    
    getJourneyInfo(user);
    function composeTypeFormLink(formId, previousAnswers){
      var partnerName = "your partner";
      var source = "https://getgilly.typeform.com/to/";
      var params =   'partner=' + partnerName
                  + '&pname=' + "" 
                  + '&userid=' + user.id 
                  + '&firstname=' + user.name
                  + '&puserid=' + user.partnerID
                  + "&email=" + user.email
                  + "&journey=" + user.journey;
      source = source + formId + "#" + params + "&" + previousAnswers;
      console.log("TypeFormLink ", source);
      return source
   }
   
   function getFormId(){
    console.log("Getting formId", day, user.journey);  
    if(!user || !user.journey)
      return;
    console.log("Fetching formId", day, user.journey);  
    API.graphql(graphqlOperation(queries.getFormId,{
      day: day,
      journey: user.journey,
     })).then((data)=>{
      console.log("getFormId ", data);
      var fId = data.data.getFormId.formId; 
      console.log("getFormId ", fId);
      setFormId(fId);
      if(data.data.getFormId.refFormId){
         console.log("setting ref formID ", data.data.getFormId.refFormId)
         setRefFormId({"fId" : data.data.getFormId.refFormId , "ownData": data.data.getFormId.sameUser}); 
      }else{
        console.log("no ref formID ", data.data.getFormId.refFormId)
        setRefFormId('');
        var source = composeTypeFormLink(fId, '');
        setTypeFormLink(source);
      }
     }).catch((error)=>{
       console.log("formId error retrieving form information ", error, day, user.journey);
       setTypeFormLink('Bummer');
    });
  }

  React.useEffect(getFormId,[]);
  
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