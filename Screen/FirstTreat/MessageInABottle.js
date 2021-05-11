// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';
import Button from '../Components/Button';



import {
  View,
  StyleSheet,
  Pressable,
} from 'react-native';



const MessageInABottle = ({navigation}) => {
  const { t } = useTranslation('FirstTreat');
  const userInfo = createStore().getState().userInfo[0];
  console.log("userInfo ", userInfo);
  function OnPress() {
    navigation.replace("FillTheBlanks");
  }

  const button = {
    color:"#841584", 
    fontSize: 20,
    
  };

  return (
    <Background>
      <View style={styles.container}>
      <View style={styles.titleview}>
        <Text style={styles.title}>
        {t("introduction")}
          </Text>
        </View>
        <View style={styles.textview}>
         
          <Text style={styles.textTop}>
            {t("text1", {name:userInfo.userName})}
          </Text>
          <Text style={styles.text}>
          
            {t("text2")}
          </Text>
        </View>
        <View style={styles.bottomview}>
          <Text style={styles.textBottom}>
            {t("text3")}
          
          </Text>
        </View>
        <View style={styles.button}>
            <Button
              text={t("button")}
              onPress={OnPress}
            />
        </View>
          
      </View>
    </Background>
  );
};

export default MessageInABottle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  textview:{
    width: '90%',
    flex: 2,
    justifyContent: "space-evenly" ,
  },

  titleview:{
    flex:1,
    justifyContent: "center" ,
  },
  
  title: {
    width: '100%',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 30,
    lineHeight: 40,
    color: '#383838',
  },

  text: {
    width: '100%',
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838'
  },

  textTop: {
    width: '100%',
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    fontWeight: "500",
  },
  
  textBottom: {
    width: '100%',
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    fontWeight: "800",
  },

  bottomview:{
    flex: 2,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  button:{
    flex: 1,
    width: '90%',
   // justifyContent: 'flex-start',
    alignItems: 'center',
  },

});