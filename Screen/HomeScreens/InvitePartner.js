// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import actionSetUserInfo from '../../state/actionSetUserInfo'
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';

import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import  Button  from '../Components/Button';
import * as colors from '../Style/Style';
import {updateUserInfo} from '../../state/userInfo'




import {
  View,
  StyleSheet,
  Text,
  Platform,
  Share
} from 'react-native';



const InvitePartner = ({navigation}) => {
  const { t } = useTranslation('invitePartner');
  const store = createStore();
  const userInfo = store.getState().userInfo[0];
  const coupleId = userInfo.coupleId || getCoupleId();
  console.log("userInfo ", userInfo);
  const [inviteSent, setInviteSent] = React.useState(false);
  const [nameOnText, setNameOnText] = React.useState( userInfo.partnerName === "your partner" ? "" : " " + userInfo.partnerName);
  const [answer, setAnswer] = React.useState("_____");
  const gillyLink = Platform.OS === "ios" ? "https://applesomething.com" : "https://bit.ly/3os50hQ";


  function getCoupleId(){
    var id = Math.random().toString(36).slice(-5);
    console.log("Couple ID", Math.random().toString(36).slice(-5));
    return  id;
  }

  function OnPress(){
    setInviteSent(true);
    var data= {
      name: userInfo.userName,
      partnerName: nameOnText, 
      answer: answer,
      coupleId: coupleId
    };
    
    var message  =   t("text1", {who: nameOnText, link: encodeURI(gillyLink)}) + coupleId;

    var formData = {
      //id: userInfo.id,
      formId: "0000002",
      journey: "Solo",
      userId: userInfo.id,
      createdAt: new Date().toISOString(),
      params: "partnerName=" + data.partnerName + "&message=" + message 
    };
    
    userInfo.coupleId = coupleId;
    store.dispatch(actionSetUserInfo(userInfo, [userInfo]));
    Share.share({
      message: message
    }).then((result) => {
      console.log("share result", result)
    if (result.action === Share.sharedAction) {
      console.log("share done")
    } else if (result.action === Share.dismissedAction) {
      console.log("share dismissed")
    }
    }).catch( (error) => {
        console.log(error);
    })

    API.graphql(graphqlOperation(mutations.createFormSubmission, {input: formData})).then((form)=>{
      console.log("Invite partner message saved on DB ", form);  
    }).catch((error)=>{
      console.log("error saving invite message  on gilly's db ", error);
    });

    var coupleData = {
      id: coupleId,
      partnerAId: userInfo.id
    }

    API.graphql(graphqlOperation(mutations.createCouple, {input: coupleData})).then((data)=>{
      console.log("coupleId Saved on DB ", data);  
    }).catch((error)=>{
      console.log("coupleIdSaved on DB", error);
    });
    
    updateUserInfo(userInfo).then((u)=>{
      console.log("UserInfo was saved", userInfo); 
    }).catch((e)=>{
      console.log("Error saving userInfo ", e);
    })
    
  }

  function Before() {
    return <React.Fragment>
          <View style={[styles.introView]}>
                <Text style={styles.textTop}>
                {t("intro")}
                </Text>
          </View>
          <View style={[styles.messageView]}>
                <Text style={styles.textMessage}>
                  {t("text1", {who: nameOnText, link: gillyLink})}
                </Text>
                <Text style={styles.textCode}>
                  {coupleId}
                </Text>

          </View>
        
      </React.Fragment>

  }
  
  return (
    <Background>
         
       <View style={[styles.container, styles.centerContent]}>
        
          <View style={[styles.titleview, styles.centerContent]}>
                <Text style={styles.title}>
                {t("title", {who: userInfo.partnerName})}
                </Text>
          </View>
          {!inviteSent && <Before/>}
        
  
    
          
          <View style={styles.bottomview}>
                <Button       
                  onPress={OnPress}
                  text={t("button")}
                />
                
          </View>
       </View>
  
    </Background>
  );
};

export default InvitePartner;

const text = {
  fontSize: 21,
  lineHeight: 28,
  color: colors.text,
  fontWeight: "500",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleview:{
    flex:1,
    width: "90%",
  },
 
  messageView:{
    flex:2,
    width: "90%",
  },
  introView:{
    flex:1,
    width: "90%",
  },

  textMessage:{
    ...text,
    fontStyle: 'italic',
  },

  title: {
    fontWeight: "800",
    fontSize: 30,
    color: colors.text,
    justifyContent: "flex-start",
  },
 
  textTop: {
    ...text,
  },

  textCode: {
     ...text,
     fontWeight: "bold",
     alignSelf: "center"
   },

  centerContent:{
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  
  bottomview:{
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

});