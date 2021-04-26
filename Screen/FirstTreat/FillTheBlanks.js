// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text, KeyboardAvoidingView, TouchableWithoutFeedback , Keyboard, Platform } from 'react-native';
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
  const { t } = useTranslation('Memory');
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

  function saveMessageAsTreat(){
        let formData = {
            formId: "00000000001",
            journey: "Solo",
            params:"pname=" + name + "&response=" + answer,
            refParams: "",
            userId: userInfo.id,
        };

       return API.graphql(graphqlOperation(mutations.createFormSubmission,{input: formData})).then((data)=>{
            console.log("Data was saved ", data);
            return (true)
          }).catch( error =>{
            console.log(error);
            return false;
          })
  }

  function OnPress(){
    
    var data= {
      name: userInfo.userName,
      partnerName: nameOnText, 
      answer: answer
    };
    

    var formData = {
      //id: userInfo.id,
      formId: "0000001",
      journey: "Solo",
      userId: userInfo.id,
      createdAt: new Date().toISOString(),
      params: "partnerName=" + data.partnerName + "&message=" + t("text1", {who: nameOnText, what: answer})
    };

    console.log("FillTheBlanks OnPress", data);
    store.dispatch(actionUpdateMessage(store.getState().messageInABottle, [data]));
    API.graphql(graphqlOperation(mutations.createFormSubmission, {input: formData})).then((form)=>{
      console.log("Message In a bottle saved on DB ", form);  
    }).catch((error)=>{
      console.log("error saving message in a bottle on gilly's db ", error);
    });
    navigation.replace("ShareMessage");
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
    
             <View style={[styles.textcontainerview, styles.centerContent]}>
                <Text style={styles.title}>
                {t("title")}
                </Text>
              </View>
              <View style={{flex: 1, width: "90%"}}>
                <Text style={styles.textTop}>
                  {t("text1", {who: nameOnText, what: answer})}
                </Text>

            </View>
            <View style={styles.textinputview}>
              <Text style={{alignSelf:"flex-start"}}> Your partner name </Text>
              <TextInput
                style={styles.inputStyle}
                label="Your partner's name"
                onChangeText={OnChangeName}
                placeholder={ userInfo.partnerName ? userInfo.partnerName : t("name")}
                value={name}
              />
            </View>
            <View style={styles.textinputview}>
            <Text style={{alignSelf:"flex-start"}}> Your message </Text>
             <TextInput
                    style={[styles.inputStyle, styles.textInputMultiline]}
                    multiline
                    label="Your Message"
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
  textcontainerview:{
    flex:1,
    width: "90%",
  },

  textinputview: {
    alignItems: 'center',
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  bottomview:{
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
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
    color: colors.text,
    width: "100%",
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
  },

  textInputMultiline:{
     height: '80%',
   },
  centerContent:{
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"

  }

});