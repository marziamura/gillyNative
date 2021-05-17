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
import * as fonts from '../Style/Fonts';



import {
  View,
  StyleSheet,
  Share
} from 'react-native';



const ShareMessage = ({navigation}) => {
  const { t } = useTranslation('ShareMessage');
  const messageData = createStore().getState().messageInABottle[0];
  const [shared, setShared] = React.useState(false);
  
  const message = t("text2", {who: messageData.partnerName, what:messageData.answer});
  const OnShare =() => { 
   const typeformLink= encodeURI(`https://getgilly.typeform.com/to/vgIraeta#firstname=${messageData.name}&partner=${messageData.partnerName}&partneramessage=${messageData.answer}`);
    Share.share({
        message: t('IntroMessage', {who: messageData.name})  + "\n" + typeformLink
      }).then((result) => {
      
      if (result.action === Share.sharedAction) {
        console.log("share done")
        setShared(true);
      } else if (result.action === Share.dismissedAction) {
        console.log("share dismissed")
      }
    }).catch( (error) => {
      console.log(error);
    })
  }


  return (
    <Background>
      <View style={[styles.container, styles.centerContent]}>

        <View style={[styles.titleview]}>
          <Text style={styles.title}>
          {t("title")}
          </Text>
        </View>
 
        <View style={[styles.textview]}>
          <Text style={styles.text}>
            {message}
          </Text>
        </View>
       
        <View style={[styles.textview]}>  
          <Text style={styles.text2}>
            {t("text1")}
          </Text>
        </View>
     
        <View style={{width: "90%"}}>
        <Text style={styles.texthint}>
             {t("hint", {who: messageData.partnerName})}
            
        </Text>
        </View>
        <View style={[styles.bottom, styles.centerContent]}>
        {shared && <React.Fragment>
          <Button
            onPress={()=> navigation.replace("HomeNavigationRoutes")}
            text={t('next')}
          />
          </React.Fragment>
        }
        {!shared && <React.Fragment>
            <Button
              onPress={OnShare}
              text={t('button', {who: messageData.partnerName})}
              pressableStyle ={{marginBottom: 10}}
            />
            <Button
              onPress={()=> navigation.replace("HomeNavigationRoutes")}
              text={t('button2', {who: messageData.partnerName})}
            />
          </React.Fragment>
        }
        </View>
          
      </View>
    </Background>
  );
};

export default ShareMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  titleview:{
    width: '90%', 
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: fonts.titleSize,
    lineHeight: 40,
    color: '#383838',
  },
  text: {
    fontStyle: 'italic',
    fontWeight: "bold",
    fontSize: fonts.normalSize,
    lineHeight: 28,
    textAlign: 'left',
    color: '#383838',
  },
  text2: {
    fontSize: fonts.normalSize,
    lineHeight: 28,
    textAlign: 'center',
    color: '#383838',
  },
  texthint: {
    fontSize: fonts.smallSize,
    textAlign: 'center',
  },
  textview: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
  },
  textviewhint: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    backgroundColor: 'red'
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