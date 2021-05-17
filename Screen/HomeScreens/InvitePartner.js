// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';

import actionUpdateMessage from '../../state/actionUpdateMessage';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import  Button  from '../Components/Button';
import * as colors from '../Style/Style';




import {
  View,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';



const FillTheBlanks = ({navigation}) => {
  const { t } = useTranslation('invitePartner');
  const store = createStore();
  const userInfo = store.getState().userInfo[0];
  console.log("userInfo ", userInfo);
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const [nameOnText, setNameOnText] = React.useState( userInfo.partnerName ? userInfo.partnerName : "_____");
  const [answer, setAnswer] = React.useState("_____");


  function OnChangeName(text){
    setName(text);
    setNameOnText(text);
  }
  
  function OnChangeText(text){
    setText(text);
    setAnswer(text);
  }

  function getCoupleId(){
    var id = Math.random().toString(36).slice(-5);
    console.log("Couple ID", Math.random().toString(36).slice(-5));
    return  id;
  }

  function OnPress(){
    
    var data= {
      name: userInfo.userName,
      partnerName: nameOnText, 
      answer: answer,
      coupleId: getCoupleId()
    };
    
    var message  = text
                 + t("code", {code: data.coupleId}) 

    var formData = {
      //id: userInfo.id,
      formId: "0000002",
      journey: "Solo",
      userId: userInfo.id,
      createdAt: new Date().toISOString(),
      params: "partnerName=" + data.partnerName + "&message=" + message
    };

  /*  store.dispatch(actionUpdateMessage(store.getState().messageInABottle, [data]));
    API.graphql(graphqlOperation(mutations.createFormSubmission, {input: formData})).then((form)=>{
      console.log("Invite partner message saved on DB ", form);  
    }).catch((error)=>{
      console.log("error saving invite message  on gilly's db ", error);
    });*/
    alert(message);
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
                {t("title")}
                </Text>
          </View>

          <View style={[styles.messageView]}>
                <Text style={styles.textTop}>
                  {t("text1", {who: nameOnText, what: answer})}
                </Text>
          </View>
        
  
          <View style={styles.textinputviewname}>
                  <Text style={{alignSelf:"flex-start"}}> {t('labelName')} </Text>
                  <TextInput
                    style={styles.inputStyle}
                    label={t("partnerName")}
                    onChangeText={OnChangeName}
                    placeholder={ userInfo.partnerName ? userInfo.partnerName : t("name")}
                    value={name}
                  />
          </View>

          <View style={styles.textinputviewmessage}>
              <Text > {t('labelMessage')} </Text>
              <TextInput
                      style={[styles.inputStyle, styles.textInputMultiline]}
                      multiline
                      label={t("yourMessage")}
                      placeholder={t("suggestion")}
                      value={text}
                      onChangeText={OnChangeText}
                  />
              
              </View>
          
              <View style={styles.bottomview}>
          
                <Button       
                  onPress={OnPress}
                  text={t("button")}
                />
                
              </View>

         
       </KeyboardAvoidingView>
       </ScrollView>
    </Background>
  );
};

export default FillTheBlanks;

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
  textinputviewname: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textinputviewmessage: {
    flex: 2,
    width: '90%',
    justifyContent: 'flex-start',
  },

  bottomview:{
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 30,
   
    color: '#383838',
    justifyContent: "flex-start",
  },
 
  textTop: {
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    color: '#383838',
    fontWeight: "500",
  },

  inputStyle: {
    //flex: 1,
    height: '40%',
    color: colors.text,
    width: "100%",
 
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
  },

  centerContent:{
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"

  }

});