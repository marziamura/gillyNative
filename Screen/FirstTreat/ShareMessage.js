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
  const messageData = createStore().getState().messageInABottle[0];
  console.log("message ", message);

  const message = t("text2", {who: messageData.partnerName, what:messageData.answer});
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


  return (
    <Background>
      <View style={[styles.container, styles.centerContent]}>

        <View style={styles.titleview}>
          <Text style={styles.title}>
          {t("title")}
          </Text>
        </View>
        <View style={[styles.textview, styles.centerContent]}>
          <Text style={styles.textTop}>
            {t("text1")}
          </Text>
          <Text style={styles.text}>
            {message}
          </Text>
        </View>
        <View style={[styles.bottom, styles.centerContent]}>
          <Button
            onPress={OnShare}
            text={t('button', {who: messageData.partnerName})}
            pressableStyle ={{marginBottom: 10}}
          />
          <Button
            onPress={()=> navigation.replace("HomeNavigationRoutes")}
            text={t('button2', {who: messageData.partnerName})}
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
  titleview:{
    width: '90%', 
    flex: 1,
  },
  title: {
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 30,
    lineHeight: 40,
    color: '#383838',
    paddingBottom: 100,
  },
  text: {

 //   fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: "600",
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
    marginTop: 20,
  },

  textview: {
    flex: 2,
    width: '90%',

  },

  bottom:{
    flex: 1,
    width: '90%',
  }, 
  centerContent:{
    alignItems: "center",
    justifyContent: "center"
  },

});