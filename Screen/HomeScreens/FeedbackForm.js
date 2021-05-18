// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';

import WebViewScreen from '../Components/WebViewScreen';
import createStore from '../../state/store';
import * as colors from '../Style/Style';
import * as fonts from '../Style/Fonts';
import { useTranslation } from 'react-i18next';
import Background from '../Components/Background';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';



console.log("loading TreatScreen");

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}



const GeneralFeedback = ({navigation}) => {
  const { t } = useTranslation('profile');
  const store = createStore();
  const user = store.getState().userInfo[0];   
  var params = '&userid=' + user.id 
  const typeformLink = "https://getgilly.typeform.com/to/t0nzkV7h" + "#" + params;
  console.log("TypeFormLink ->", typeformLink);
  return <Background>
          <View style={styles.container}>
                <View style={styles.titleview}>
                      <Text style={styles.title}>
                        {t("title", {who: capitalize(user.userName)})}
                      </Text>
                </View>
                <View style={{flex: 6}}>
                    <WebViewScreen url={typeformLink} navigation={navigation} afterSubmission={"ThankYou"}/>
                </View>
          </View>
        </Background>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  titleview:{
    flex:1,
    width: "100%",
    justifyContent: "center", 
    alignItems: "center",
  },
  title: {
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: fonts.titleSize,
    color: colors.text,
    justifyContent: "flex-start",
  },
 
});
 

export default GeneralFeedback;