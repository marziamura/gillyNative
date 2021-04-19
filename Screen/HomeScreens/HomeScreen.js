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
import * as colors from '../Style/Style';
import actionSetTreatData from "../../state/actionSetTreatData";
import {getJourneyInfo} from "../../state/userInfo";
import { Paragraph, Dialog} from 'react-native-paper';
import { Button as RNPButton} from 'react-native-paper';
import actionSetPushNotificationPreferences from '../../state/actionSetPushNotificationPreferences'
import FlatList from '../Components/carousel'
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import InfoDialog from '../Components/InfoDialog';


console.log("loading HomeScreen");

const viewWidth= '90%';
const margin= 20;
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
  console.log("******** HomeScreen ******** ", user.lastTreatInJourney, pushNotificationPreferences);
  return (
  <Background>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={[styles.welcomeView, styles.viewPlacement]}>
        <Text style={styles.title}> {t("welcome", {who: user.userName} )}</Text>
        
        </View>
        <View style={[styles.inviteView, styles.centerContent, , styles.viewPlacement]}>
            <Text style={styles.btnText}>
             {t("invite")}
            </Text>
        </View>
        <View style={[styles.treatView, styles.viewPlacement]}>
          <View style={{flex: 1, width: viewWidth}}>
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 5 }}>
                <Text style={styles.journeyTitle}>
                  {t("nextTreat")}
                </Text>
                </View>
                <View style={{flex: 1}}>    
                <IconButton
                  icon="information"  
                  size={20}
                  onPress={openTreatInfo}
                  style={styles.infoIcon}
                />
              </View>
            </View>
            </View>
          <View style={{flex: 3}}>  
            <Text style={styles.treatBlurb}>
                 {treatDescription}
            </Text>
            <View style={styles.treatButton}>
            <LinearGradient
          // Background Linear Gradient
              colors={['#FFB1A6', '#FFA497']}
              start={[0.2041, 0.8561]}
              style={styles.linearGradient}
            >
              <Pressable 
                disabled={buttonDisabled} 
                onPress={press}
                style={({ pressed }) => [   
                  styles.button
                ]}>
                {({ pressed }) => (
                  <Text style={styles.btnText}>
                  {t("openTreat")}
                  </Text>
                )}
              </Pressable>
              </LinearGradient>
            </View>
            </View>
        </View>
        <View style={[styles.journeysView, styles.viewPlacement]}>
          <View style={{flex: 1, width: viewWidth}}>
            <View style={{flexDirection: "row",   }}>
                <View style={{flex: 5   }}>
                <Text style={styles.journeyTitle}>
                  {t("exploreJourneys")}
                </Text>
                </View>
                <View style={{flex: 1}}>    
                <IconButton
                  icon="information"  
                  size={20}
                  onPress={openJourneyInfo}
                  style={styles.infoIcon}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 6}}>
            <FlatList/>
          </View>
        </View>
        <View style={[styles.intimacyProfileView, styles.viewPlacement, styles.centerContent]}>
            <Text style={styles.btnText}>
                {t("completeProfile")}
            </Text>
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
    backgroundColor: '#D9E9CB',
  },
  treatView:{
    flex:2,
    backgroundColor: '#C4C4C4',
    marginTop: margin,
  },
  journeysView:{
    flex:2,
 //   backgroundColor: 'orange',
    marginTop: margin,
  },
  centerContent:{
    alignItems: "center",
    justifyContent: "center"
  },
  intimacyProfileView:{
    flex:1,
    backgroundColor: '#D9E9CB',
    marginTop: margin,
  },
  moodCheckView:{
    flex:1,
    backgroundColor: 'orange',
  },
  treatButton:{
    position: 'relative',
    width: 150,
    left: 20,
    top: 10,
    //background: 'linear-gradient(95.18deg, #FFB1A6 20.41%, #FFA497 85.61%)',
    borderRadius: 24,
  },
  linearGradient:{
    borderRadius: 24,
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
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
  treatBlurb:{
    fontSize: 20,
    marginLeft: 15
  },
  title:{
    fontSize: 25,
    marginTop: 10
},
infoIcon:{
 
},
journeyTitle:{
  alignSelf: "flex-start",
  color: "black",
  fontSize: 25,
  justifyContent: "center",
  
}
});

export default HomeScreen;

