// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';
import Background from '../Components/Background';
import Button from '../Components/Button';
import * as colors from '../Style/Style';


import {
  View,
  StyleSheet,
  Share
} from 'react-native';



const ShareMessage = ({navigation}) => {
  const { t } = useTranslation('ShareMessage');
  const message = createStore().getState().messageInABottle[0];
  console.log("message ", message);

  const OnShare =() => { 
   const typeformLink= `https://getgilly.typeform.com/to/vgIraeta#firstname=${message.name}&partner=${message.partnerName}&partneramessage=${message.answer}`
    Share.share({
        message: t('IntroMessage', {who: message.name})  + "\n" + typeformLink
      }).then((result) => {
      
      if (result.action === Share.sharedAction) {
        navigation.replace("HomeNavigationRoutes");
      } else if (result.action === Share.dismissedAction) {
        
      }
    }).catch( (error) => {
      console.log(error);
    })
  }

  const buttonText = {
    color: colors.buttonText,
    fontSize: 20,
    
  };
  const button2 = {
    backgroundColor:"transparent", 
    borderWidth: 0,
    marginTop: 10,
  };
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
            {message.message}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Button
            press={OnShare}
            title={t('button', {who: message.partnerName})}
            styletext={buttonText}
            accessibilityLabel="Home"
          />
          <Button
            press={()=> navigation.replace("HomeNavigationRoutes")}
            title={t('button2', {who: message.partnerName})}
            styletext={buttonText}
            styleover={button2}
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
    
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    color: '#383838',
    paddingBottom: 100,
  },
  text: {
    width: '100%',
 //   fontFamily: 'Roboto',
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
    //fontFamily: 'Roboto',
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
    //fontFamily: 'Roboto',
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
  }

});