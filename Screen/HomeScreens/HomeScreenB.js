import React from 'react';
import {View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import Background from '../Components/Background'
import createStore from '../../state/store';
import { updateUserInfo } from '../../state/userInfo';

import { Paragraph, Dialog} from 'react-native-paper';
import { Button as RNPButton} from 'react-native-paper';
import actionSetPushNotificationPreferences from '../../state/actionSetPushNotificationPreferences'

import { IconButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import InfoDialog from '../Components/InfoDialog';
import ChooseTreat from '../Components/exploreTreats';
import * as colors from '../Style/Style';
import * as fonts from '../Style/Fonts';
import JourneyInfo from '../Components/JourneyStatus';
import * as params from '../Style/Params';
import Text from '../Components/GillyText';

const viewWidth= params.viewWidth;
const margin= params.margin;
const viewBorderRadius = params.viewBorderRadius;


const HomeScreen = ({navigation}) => {
  
  const { t } = useTranslation('Home');
  let store = createStore();
  const user = store.getState().userInfo[0];
  const pushNotificationPreferences = store.getState().pushNotificationPreferences;
  console.log("User ====> ", user)
 // const [dialogOpen, setDialogOpen] = React.useState(pushNotificationPreferences[0].consent === "None");
 const [dialogOpen, setDialogOpen] = React.useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  const [updateInfo, setUpdateInfo] = React.useState(false);
  const [journeyInfoDialogOpen, setInJourneyInfoDialogOpen] = React.useState(false);
 
  
  const openTreatInfo = () =>{
    setInfoDialogOpen(true);
  }
  const openJourneyInfo = () =>{
    setInJourneyInfoDialogOpen(true);
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
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

  
  function Divider() {
    return <View style={{height: 1, backgroundColor: colors.header, width: "90%", margin: 5}}/>
  }

  
  React.useEffect(()=>{
    if(updateInfo){
      updateUserInfo().then((info) => console.log("updated pushNotification Token", info))
      .catch(error=> console.log(error))
    }
  }, [updateInfo])
  


  function closeInfoDialog(){
        setInfoDialogOpen(false);
        setInJourneyInfoDialogOpen(false)
  }

  function ViewTitle(props){
   const textStyle = props.enabled ? styles.textEnabled : styles.textDisabled;
   
   return <View style={{flex: 0.5, width: viewWidth, marginBottom: 5}}>
    <View style={[styles.centerContent, {flexDirection: "row"}]}>
      <View style={{flex: 5 }}>
      <Text style={textStyle}>
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
           <Text style={styles.title}> {t("welcome", {who: capitalize(user.userName)} )}</Text>
        </View>
        <View style={{flex: 9}}>
            <JourneyInfo user={user} navigation={navigation}/>
        <Divider />
        <View style={[styles.carouselView, styles.viewPlacement]}>
            <ViewTitle text={t("nextTreat")} onPress={openTreatInfo} enabled={true}/>
            <View style={{flex: 4, marginTop: 2}}>  
                <ChooseTreat navigation={navigation} user={user} enabled={true}/>
            </View>
        </View>
        <Divider  />
        <View style={[styles.carouselView, styles.viewPlacement]}>
          <ViewTitle text={t("withPartner")} onPress={openJourneyInfo} enabled={false}/>
          <View style={{flex: 3, marginTop: 2}}>
              <ChooseTreat navigation={navigation} user={user} enabled={false} partnerName={user.partnerName}/>
          </View>
        </View>
        <Divider />
        <View style={[styles.intimacyProfileView, styles.viewPlacement, styles.centerContent]}>
          <Pressable  onPress={()=>{navigation.push("IntimacyProfile")}}>
            <Text style={styles.btnText}>
                {t("completeProfile")}
            </Text>
            </Pressable>
        </View>
       </View>
      </View>
   
        { dialogOpen ? <ConsentDialog /> : null}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }, 
 
  carouselView:{
    flex:2,
    marginTop: margin,
  },

  centerContent:{
    alignItems: "center",
    justifyContent: "center",
  },
  intimacyProfileView:{
    flex:0.5,
    backgroundColor: colors.cards,
    marginTop: margin,
    marginBottom: margin
  },

  btnText: {
    color: colors.text,
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },

  title: {
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: fonts.titleSize,
    color: colors.text,
    justifyContent: "flex-start",
  },
  titleTreat: {
    fontSize: fonts.titleSize,
    marginLeft: 10,
    padding: 10,
  },


textEnabled:{
 // alignSelf: "center",
  color: colors.textEnabled,
  fontSize: fonts.smallSize,
  justifyContent: "center",
  fontFamily: "montserrat" 
  
},
textDisabled:{
  // alignSelf: "center",
   color: colors.textDisabled,
   fontSize: fonts.smallSize,
   justifyContent: "center",
   fontFamily: "montserrat" 
 }
});

export default HomeScreen;

