// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import Background from '../Components/Background'
import createStore from '../../state/store';
import { updateUserInfo } from '../../state/userInfo';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as colors from '../Style/Style';
import actionSetTreatData from "../../state/actionSetTreatData";
import {getJourneyInfo} from "../../state/userInfo";
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import { Button as RNPButton} from 'react-native-paper';
//import Button from '../Components/Button';
import { Button } from 'react-native-paper';
import actionSetPushNotificationPreferences from '../../state/actionSetPushNotificationPreferences'


console.log("loading HomeScreen");




const HomeScreen = ({navigation}) => {
  let store = createStore();
  const user = store.getState().userInfo[0];
  const pushNotificationPreferences = store.getState().pushNotificationPreferences;
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [treatDescription, setTreatDescription] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(pushNotificationPreferences[0].consent === "None" && user.lastTreatInJourney === 2);
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
 
  

  function ConsentDialog(props){
  
 
    const onDeny = () => {
      var pushConsent ={ consent : "Deny"};
      store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setDialogOpen(false);
    };

    const onOkay = () => {
      var pushConsent ={ consent : "OK"};
      store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setDialogOpen(false);
    };
    
    return <Dialog visible={true} onDismiss={() => setDialogOpen(false)}>
            <Dialog.Title>Push Notifications</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Research shows that small steps taken regularly make the biggest difference. Would you like to receive a gentle reminder from Gilly to "treat" your relationship every other day?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <RNPButton onPress={onOkay}>Yes</RNPButton>
              <RNPButton onPress={onDeny}>No</RNPButton>
            </Dialog.Actions>
          </Dialog>
  }

  function InfoDialog(props){
  
 
    const onDeny = () => {
      var pushConsent ={ consent : "Deny"};
      store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setDialogOpen(false);
    };

    const onOkay = () => {
      var pushConsent ={ consent : "OK"};
      store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setDialogOpen(false);
    };
    
    return <Dialog visible={true} onDismiss={() => setInfoDialogOpen(false)}>
            <Dialog.Title>A treat?</Dialog.Title>
            <Dialog.Content>
              <Paragraph>A treat = knowledge + an activity to help you apply and try what you're learning IRL (in real life). In spirit, it is really a treat for yourself; for your relationship.
                         As a parent, being able to prioritize your well-being and your sacred couple space IS a treat!</Paragraph>
            </Dialog.Content>
          </Dialog>
  }

 
  function press(){
    console.log("OnPress");
    navigation.replace("TodaysTreat")
  };



  
  React.useEffect(()=>{
    updateUserInfo().then((info) => console.log("updated pushNotification Token", info))
    .catch(error=> console.log(error))
  }, [dialogOpen])
  
  function getFormId(){

        var formIdNb = user.lastTreatInJourney - 1;
        console.log("Getting formId", formIdNb);  
        if(!user || !user.journey)
          return;
        
        API.graphql(graphqlOperation(queries.getFormId,{
          day: formIdNb,
          journey: user.journey,
        })).then((data)=>{
          console.log("getFormId ", data);
          var fId = data.data.getFormId.formId; 
          console.log("getFormId ", fId);
          var treatData={
            id: fId,
            description: data.data.getFormId.description
          }
        
          store.dispatch(actionSetTreatData([treatData])); 
          setButtonDisabled(false);
          setTreatDescription(treatData.description || "Ready for your next treat?");
      
        }).catch((error)=>{
          console.log("formId error retrieving form information ", error, formIdNb, user.journey);
          // setFormId(null);
        });
  }


  React.useEffect(()=>{
     console.log("getting updated journey info with user", user);
     var oldTreatNumber = user.lastTreatInJourney;
     getJourneyInfo(user).then((newUserData)=>{
        if(oldTreatNumber !== newUserData.lastTreatInJourney || !treatDescription)
        {
          getFormId()
        }
     }).catch((err)=>console.log("cannot get updated journey info",err));
    },[])
  
  console.log("******** HomeScreen ******** ", user.lastTreatInJourney, pushNotificationPreferences);
  return (
  <Background>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.containerView}>
        <View style={[styles.welcomeView, styles.orange]}>
            <Text style={styles.textStyle}>{"Welcome to your home page " + user.userName}</Text>
            
        </View> 
       <View style={[styles.textView, styles.blue]}>
            <Text style={styles.textStyle}>Your next treat is about...</Text>
            <Text style={styles.textStyle}>{treatDescription}</Text>
        </View> 
        <View style={[styles.buttonView, styles.orange]}>
        <Button       
              onPress={press}
              disabled={buttonDisabled}
              accessibilityLabel="Open my Treat"
              mode="outlined" 
              uppercase={false}
              contentStyle={styles.button}
              style={styles.buttonStyle}
          >
            Open my Treat
          </Button>
          <Button       
              onPress={()=>{setInfoDialogOpen(true)}}
              disabled={buttonDisabled}
              accessibilityLabel="What's aTreat"
              uppercase={false}
              contentStyle={styles.button}
              style={styles.buttonStyle}
          >
            What's a treat?
          </Button>
        </View> 
        { dialogOpen ? <ConsentDialog /> : null}
        { infoDialogOpen ? <InfoDialog /> : null}
    </View>
  
    </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  
  welcomeView:{
    //  width: '100%',
    //  height: "5%",
        justifyContent: 'center',
        alignItems: 'center',
      color: colors.text,
      //padding: 20,  
  },

  textView:{
    
       justifyContent: 'center',
       alignItems: 'center',
       color: colors.text,
       padding: 10,
       
  },

  textStyle:{
    fontSize: 25,
    textAlign: "center",
  },
  buttonView:{
 //   width: '60%',
 //   height: "20%",
    justifyContent: 'center',
    alignItems: 'center',
 },
 buttonStyle:{
  justifyContent: 'center',
  width: '100%',
  height: "30%",
  borderRadius: 30,
 },
  containerView: {
    flex: 1,
    flexDirection: 'column',
  //  alignItems: 'center',
  //  justifyContent: 'center',
   // backgroundColor: colors.background,
  },
  button : {
    color:"#841584", 
    fontSize: 20,
  },
  orange: {
    backgroundColor: '#e3aa1a',
    flex:1
  },
  blue: {
    backgroundColor: '#2196F3',
    flex:2
  }
  
 

})

export default HomeScreen;
