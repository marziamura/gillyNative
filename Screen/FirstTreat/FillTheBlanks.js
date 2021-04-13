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
import { TextInput } from 'react-native-paper';
import  Button  from '../Components/Button';




import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';



const FillTheBlanks = ({navigation}) => {
  const { t } = useTranslation('Memory');
  const store = createStore();
  const userInfo = store.getState().userInfo[0];
  console.log("userInfo ", userInfo);
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const [nameOnText, setNameOnText] = React.useState("_____");
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
    
    /*type FormSubmission @model @key(fields:["userId", "formId"]){
      id: ID!,
      formId:String!,
      journey: String!,
      createdAt: AWSDateTime!
      params: String,
      refParams: String,
      userId: String!,
    }*/
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
          justifyContent: 'center',
          alignContent: 'center',
        }}>
       <KeyboardAvoidingView enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
    
          <View>
             <View style={styles.textcontainerview}>
              <Text style={styles.title}>
              {t("title")}
              </Text>
          
              <Text style={styles.textTop}>
                {t("text1", {who: nameOnText, what: answer})}
              </Text>

            </View>
            <View style={styles.textinputview}>
              <TextInput
                style={styles.textInput}
                label="Your partner's name"
                onChangeText={OnChangeName}
                placeholder={t("name")}
                value={name}
              />
            
  
                <TextInput
                    style={styles.textInputMultiline}
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
        </View>
         
       </KeyboardAvoidingView>
       </ScrollView>
    </Background>
  );
};

export default FillTheBlanks;

const styles = StyleSheet.create({
  containerview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textcontainerview:{
    paddingTop: 40,
  },
  textinputview:{
    padding: 10,
    height: '20%',
  },
  textinputviewmessage:{
    padding: 10,
    height: '30%',
  },
  bottomview:{
    height: '40%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
  //  position: 'absolute',
    width: '100%',
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    color: '#383838',
    paddingTop: 40,
  //  marginTop: 20,
  },
 
  textTop: {
    width: '100%',
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    marginTop: 40,
    fontWeight: "500",
  },
  textInput:{
   // borderWidth:1,
    borderRadius: 10,
    height: 60,
    marginTop: 20,
  },
  textInputMultiline:{
    // borderWidth:1,
   //  borderRadius: 10,
   //  height: 120,
     marginTop: 10,
   },
  

});