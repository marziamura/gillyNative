// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, TouchableWithoutFeedback , Keyboard, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';
import Button from '../Components/Button';
import actionUpdateMessage from '../../state/actionUpdateMessage';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';



import {
  View,
  StyleSheet,
  TextInput
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
      partnerName: name,
      answer: t("text1", {who: nameOnText, what: answer})
    }
    store.dispatch(actionUpdateMessage([data]));
    saveMessageAsTreat().then(()=>{
         navigation.replace("ShareMessage")
    }).catch(()=>{})
  }
  const button = {
    color:"#841584", 
    fontSize: 20,
    alignSelf:"flex-start"
  };
  const buttonArea = {
    alignSelf: 'center',
    width: '80%',
    alignContent: 'flex-start',
    backgroundColor: '#FFFF'
  };
  
  return (
    <Background>
       <KeyboardAvoidingView
            style={styles.container}
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
    
          
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
                onChangeText={OnChangeName}
                placeholder={t("name")}
                value={name}
              />
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.textInputBottom}
                onChangeText={OnChangeText}
                placeholder={t("suggestion")}
                value={text}
              />
            </View>
            <View style={styles.bottomview}>
              <Button
                press={OnPress}
                title={t('button')}
                styletext={button}
                styleover={buttonArea}
                accessibilityLabel="Home"
              />
            </View>
            
         
       </KeyboardAvoidingView>
      
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
    height: '40%',
    width: '90%', 
    marginLeft: 10
  },
  textinputview:{
    height: '50%',
    width: '90%',
    marginLeft: 10
  },

  bottomview:{
    height: '10%',
    width: '90%',
    alignContent: 'center',
    justifyContent: 'center'
  },

  title: {
    position: 'absolute',
    width: '100%',
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    color: '#383838',
    paddingBottom: 100,
    marginTop: 20,
  },
 
  textTop: {
    width: '100%',
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    marginTop: 80,
    fontWeight: "500",
  },
  textInput:{
    borderWidth:1,
    borderRadius: 10,
    width: '100%',
    height: '20%',
    marginTop: 40,
  },
  textInputBottom:{
    borderWidth:1,
    height: '60%',
    borderRadius: 10,
    marginTop:20,
    marginBottom: 20,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#FFFF'
  }
 

});