// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';
import Button from '../Components/Button'


import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';



const MessageInABottle = ({navigation}) => {
  const { t } = useTranslation('FirstTreat');
  const userInfo = createStore().getState().userInfo[0];
  console.log("userInfo ", userInfo);
  function OnPress() {
    navigation.replace("FillTheBlanks");
  }
  return (
    <Background>
      <View style={styles.container}>

        <View style={styles.textcontainer}>
          <Text style={styles.title}>
          {t("introduction")}
          </Text>
          <View style={{height: '10%'}}/>
          <Text style={styles.textTop}>
            {t("text1", {name:userInfo.userName})}
          </Text>
          <Text style={styles.text}>
            {t("text2")}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.textBottom}>
            {t("text3")}
          </Text>

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

export default MessageInABottle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textcontainer:{
    width: '90%', height: '60%',
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
    paddingTop: 40,
    fontWeight: "500",
  },
  
  textBottom: {
    width: '100%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    paddingBottom: 40,
    fontWeight: "800",
  },

  bottom:{
    height: '40%',
    width: '90%'
  },
  button:{
    color:"#841584", 
    fontSize: 40,
    
  }
 

});