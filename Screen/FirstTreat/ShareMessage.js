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
  View,
  StyleSheet
} from 'react-native';



const ShareMessage = ({navigation}) => {
  const { t } = useTranslation('ShareMessage');
  const message = createStore().getState().messageInABottle[0];
  console.log("message ", message);

  return (
    <Background>
      <View style={styles.container}>

        <View style={styles.textcontainer}>
          <Text style={styles.title}>
          {t("title")}
          </Text>
          <View style={{height: '10%'}}/>
          <Text style={styles.textTop}>
            {t("text1")}
          </Text>
          <Text style={styles.text}>
            {t("text2", {who:message.partnerName, what:message.message})}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Button
            press={() => navigation.replace("HomeNavigationRoutes")}
            title={t('button', {who: message.partnerName})}
            style={styles.button}
            accessibilityLabel="Home"
          />
        </View>
          
      </View>
    </Background>
  );
};

export default ShareMessage;

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
    fontStyle: 'italic',
    fontWeight: "600",
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    marginTop: 20,

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