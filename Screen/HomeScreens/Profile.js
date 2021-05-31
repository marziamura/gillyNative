// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';
import { Auth } from 'aws-amplify';
import  Button  from '../Components/Button';
import * as colors from '../Style/Style';
import * as fonts from '../Style/Fonts';


import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Text from "../Components/GillyText";


const Profile = ({navigation}) => {
  const { t } = useTranslation('profile');
  const store = createStore();
  const userInfo = store.getState().userInfo[0];
  const coupleId = userInfo.coupleId;
  var withPartner = "";
  var inviteText = null;
 
  if(coupleId){
   if(userInfo.partnerID){
      withPartner = t("withPartner", {who: userInfo.partnerName}); 
    }else{
      withPartner = t("pendingInvite");
      inviteText =t("inviteAgain")
    }
  }else{
    withPartner = t("withoutPartner");
    inviteText= t("invite");
  }
  

  function OnPress(){
    Auth.signOut();
    navigation.replace('AuthNavigationRoutes');
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  
  function Info(props){
 
    return (
      <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
      <View style={{flex: 2}}>
        <Text style={styles.textDescription}>
                  {t(props.text)}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.textInfo}>
             {capitalize(props.info)}
        </Text>
      </View>  
    </View>
    )
  }
  return (
    <Background>
         <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
    
          alignContent: 'center',
        }}>
       <KeyboardAvoidingView enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, styles.centerContent]}
            
        >
        
         <View style={[styles.titleview, styles.centerContent]}>
                <Text style={styles.title}>
                {t("title", {who: capitalize(userInfo.userName)})}
                </Text>
                
         </View>
         <View style={{flex: 6, width: "90%"}}>
          <View style={[styles.infoView]}>
            <Info text="gender" info = {userInfo.gender} />
            <Info text="sex" info = {userInfo.sex} />
            <Info text="partner" info = {userInfo.partnerName} />

            <Text style={styles.textBottom}>
                  {withPartner}
            </Text>
            {inviteText &&
              <View style={[styles.centerContent]}>
                <TouchableHighlight 
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={()=>{navigation.push("InvitePartner")}}>
                  <Text style={styles.inviteText}>
                    {inviteText}
                  </Text>
                </TouchableHighlight>
              </View>
            }
          </View>


        
  
          
          <View style={styles.bottomview}>
          
                <Button       
                  onPress={OnPress}
                  text={t("button")}
                />
                
           </View>

         </View>
       </KeyboardAvoidingView>
       </ScrollView>
    </Background>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleview:{
    flex:1,
    width: "90%",
  },
 
  infoView:{
    flex:3,
    width: "90%",
    justifyContent: "space-between"
  },

  bottomview:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: fonts.titleSize,
   
    color: colors.text,
    justifyContent: "flex-start",
  },
 
 textDescription : {
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: fonts.normalSize,
    lineHeight: 28,
    color: colors.text,
  },
  
  textInfo: {
     fontFamily: 'Roboto',
     fontStyle: 'italic',
     fontSize: fonts.smallSize,
     lineHeight: 28,
     color: colors.text,
   },

  textBottom: {
    // fontFamily: 'Roboto',
     fontStyle: 'italic',
     fontSize: fonts.normalSize,
     lineHeight: 28,
     color: colors.text,
     fontWeight: "500",
   },

  centerContent:{
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"

  }, 
  inviteText: {
    color: "blue",
    textDecorationLine: 'underline',
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
  },

});