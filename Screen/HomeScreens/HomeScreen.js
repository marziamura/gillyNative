// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, Pressable} from 'react-native';
import Background from '../Components/Background'
import createStore from '../../state/store';
import { updateUserInfo } from '../../state/userInfo';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import actionSetTreatData from "../../state/actionSetTreatData";
import {getJourneyInfo} from "../../state/userInfo";
import { Paragraph, Dialog} from 'react-native-paper';
import { Button as RNPButton} from 'react-native-paper';
import actionSetPushNotificationPreferences from '../../state/actionSetPushNotificationPreferences'
import ExploreJourneys from '../Components/exploreJourneys'

import { IconButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import InfoDialog from '../Components/InfoDialog';
import ChooseTreat from '../Components/chooseTreat';
import * as colors from '../Style/Style'





console.log("loading HomeScreen");

const viewWidth= '90%';
const margin= 5;
const viewBorderRadius = 20;


const HomeScreen = ({navigation}) => {
  const { t } = useTranslation('Home');
  let store = createStore();
  const user = store.getState().userInfo[0];
  const pushNotificationPreferences = store.getState().pushNotificationPreferences;
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [treatDescription, setTreatDescription] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(pushNotificationPreferences[0].consent === "None" && user.lastTreatInJourney === 2);
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  const [updateInfo, setUpdateInfo] = React.useState(false);
  const [journeyInfoDialogOpen, setInJourneyInfoDialogOpen] = React.useState(false);
 
  
  const openTreatInfo = () =>{
    setInfoDialogOpen(true);
  }
  const openJourneyInfo = () =>{
    setInJourneyInfoDialogOpen(true);
  }

  function ConsentDialog(props){
    const { t } = useTranslation('Notifications');
 
    const onDeny = () => {
      var pushConsent ={ consent : "Deny"};
      store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setUpdateInfo(true);
      setDialogOpen(false);
    };

    const onOkay = () => {
      var pushConsent ={ consent : "OK"};
      store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setUpdateInfo(true);
      setDialogOpen(false);
    };
    
    return  <Dialog visible={true} onDismiss={() => setDialogOpen(false)}>
              <Dialog.Title>{t("title")}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{t("paragraph")}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <RNPButton onPress={onOkay}>Yes</RNPButton>
                <RNPButton onPress={onDeny}>No</RNPButton>
              </Dialog.Actions>
            </Dialog>
  }

  function press(){
    console.log("OnPress");
    navigation.replace("TodaysTreat")
  };

  
  function Divider() {
    return <View style={{height: 1, backgroundColor: colors.header, width: "90%", margin: 5}}/>
  }

  
  React.useEffect(()=>{
    if(updateInfo){
      updateUserInfo().then((info) => console.log("updated pushNotification Token", info))
      .catch(error=> console.log(error))
    }
  }, [updateInfo])
  
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

  function closeInfoDialog(){
        setInfoDialogOpen(false);
        setInJourneyInfoDialogOpen(false)
  }

  function ViewTitle(props){
   return <View style={{flex: 1, width: viewWidth}}>
    <View style={[styles.centerContent,{flexDirection: "row"}]}>
      <View style={{flex: 5 }}>
      <Text style={styles.journeyTitle}>
        {props.text}
      </Text>
      </View>
      <View style={{flex: 1}}>    
      <IconButton
        icon="information"  
        size={20}
        onPress={props.onPress}
        style={styles.infoIcon}
      />
    </View>
  </View>
  </View>
  }

  return (
  <Background>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={[styles.welcomeView, styles.viewPlacement]}>
        <Text style={styles.title}> {t("welcome", {who: user.userName} )}</Text>
        
        </View>
        <View style={[styles.inviteView, styles.centerContent, , styles.viewPlacement]}>
          <Pressable  onPress={()=>{navigation.replace("InvitePartner")}}>
            <Text style={styles.btnText}>
             {t("invite")}
            </Text>
          </Pressable>
        </View>
        <Divider />
        <View style={[styles.carouselView, styles.viewPlacement]}>
            <ViewTitle text={t("nextTreat")} onPress={openTreatInfo}/>
            <View style={{flex: 3, marginTop: 2}}>  
                <ChooseTreat navigation={navigation}/>
            </View>
        </View>
        <Divider  />
        <View style={[styles.carouselView, styles.viewPlacement]}>
          <ViewTitle text={t("exploreJourneys")} onPress={openJourneyInfo}/>
          <View style={{flex: 3, marginTop: 2}}>
            <ExploreJourneys navigation={navigation}/>
          </View>
        </View>
        <Divider />
        <View style={[styles.intimacyProfileView, styles.viewPlacement, styles.centerContent]}>
          <Pressable  onPress={()=>{navigation.replace("IntimacyProfile")}}>
            <Text style={styles.btnText}>
                {t("completeProfile")}
            </Text>
            </Pressable>
        </View>
       
      </View>
   
        { false ? <ConsentDialog /> : null}
        { infoDialogOpen ? <InfoDialog text={"infoTreat"} callback={closeInfoDialog}/> : null}
        { journeyInfoDialogOpen ? <InfoDialog text={"infoJourney"} callback={closeInfoDialog}/> : null}
 
  
    </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewPlacement:{
    alignSelf: "center",
    width: viewWidth,
    borderRadius: viewBorderRadius,
  },
  welcomeView:{
    flex:0.5,
  }, 
  inviteView:{
    flex:1,
    backgroundColor: colors.cards2,
    marginTop: margin
  },
  carouselView:{
    flex:2,
    marginTop: margin,
  },

  centerContent:{
    alignItems: "center",
    justifyContent: "center"
  },
  intimacyProfileView:{
    flex:1,
    backgroundColor: colors.cards2,
    marginTop: margin,
    marginBottom: margin
  },
  moodCheckView:{
    flex:1,
    backgroundColor: 'orange',
  },

  button: {
    width: '100%',
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 60,
  },
  btnText: {
    color: "black",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  header: {
    fontSize: 25,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    justifySelf: "center",
  },
  titleTreat: {
    fontSize: 25,
    marginLeft: 10,
    padding: 10,
  },

  title:{
    fontSize: 25,
    marginTop: 10
  },

journeyTitle:{
 // alignSelf: "center",
  color: "black",
  fontSize: 23,
  justifyContent: "center",
  
}
});

export default HomeScreen;

