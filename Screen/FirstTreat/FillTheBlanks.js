// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text, KeyboardAvoidingView, TouchableWithoutFeedback , Keyboard, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';
import Button from '../Components/Button';
import actionUpdateMessage from '../../state/actionUpdateMessage';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { TextInput } from 'react-native-paper';



import {
  View,
  StyleSheet,

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
  
  function OnPress(){
    
    var data= {
      partnerName: name,
      answer: t("text1", {who: nameOnText, what: answer})
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
      params: "partnerName=" + data.partnerName + "&message=" + data.answer
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
  const button = {
    color:"#841584", 
    fontSize: 20,
    
  };
  
  return (
    <Background>
       <KeyboardAvoidingView
            style={styles.container}
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            
            </View>        
            <View style={styles.textinputview}>
                <TextInput
                    multiline
                    label="Your Message"
                    placeholder={t("suggestion")}
                    value={text}
                    onChangeText={OnChangeText}
                />
            
            </View>
            <View style={styles.bottomview}>
              <Button
                press={OnPress}
                title={t('button')}
                styletext={button}
                accessibilityLabel="Home"
              />
            </View>
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
    justifyContent: 'flex-start',
  },
  textcontainerview:{
  
  },
  textinputview:{
    padding: 3,
  },

  bottomview:{
    height: '10%',
    width: '90%',
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
   // borderWidth:1,
    borderRadius: 10,
    height: 60,
    marginTop: 20,
  },
  textInputBottom:{
 //   borderWidth:1,
    height: 100,
    borderRadius: 10,
    marginTop:0,
    marginBottom: 20,
  }
 

});