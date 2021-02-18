// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';
import Button from '../Components/Button';
import actionUpdateMessage from '../../state/actionUpdateMessage';



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
  
  function OnPress(){
    var data= {
      partnerName: name,
      answer: answer
    }
    store.dispatch(actionUpdateMessage([data]));
    navigation.replace("ShareMessage");
  }

  return (
    <Background>
      <View style={styles.container}>

        <View style={styles.textcontainer}>
          <Text style={styles.title}>
          {t("title")}
          </Text>
      
          <Text style={styles.textTop}>
            {t("text1", {who: nameOnText, what: answer})}
          </Text>

        </View>
        <View style={{width: '90%', height: '40%',}}>
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
        <View style={styles.bottom}>
          <Button
            press={OnPress}
            title={t('button')}
            style={styles.button}
            accessibilityLabel="Home"
          />
        </View>
          
      </View>
    </Background>
  );
};

export default FillTheBlanks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textcontainer:{
    width: '90%', height: '40%',
  },
  title: {
    position: 'absolute',
    width: '100%',
    
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    color: '#383838',
    paddingBottom: 100,
  },
  text: {
    width: '100%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838'
  },

  textTop: {
    width: '100%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    marginTop: 60,
    fontWeight: "500",
  },
  

  bottom:{
    height: '20%',
    width: '90%',
  },
  button:{
    color:"#841584", 
    fontSize: 40,
  },
  textInput:{
    borderWidth:1,
    borderRadius: 10,
    width: '100%',
    height: '20%'
  },
  textInputBottom:{
    borderWidth:1,
    height: '100%',
    borderRadius: 10,
    marginTop:20,
    marginBottom: 20,
  }
 

});