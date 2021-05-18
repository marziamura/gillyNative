// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';

import  WebViewScreen  from '../Components/WebViewScreen';
import createStore from '../../state/store';
import Background from '../Components/Background';
import * as fonts from '../Style/Fonts'
import * as colors from '../Style/Style'
import  Button  from '../Components/Button';
import { useTranslation } from 'react-i18next'; 

import {
  View,
  StyleSheet,
  Text
} from 'react-native';

console.log("loading TreatScreen");



const TreatScreen = ({navigation}) => {
    const { t } = useTranslation('treat');
    let store = createStore(); 
    const treatData = store.getState().currentTreat[0];   
    const user = store.getState().userInfo[0]; 
    console.log("Treat Screen", user);
    var source = "https://getgilly.typeform.com/to/";
    var params = '&userid=' + user.id 
                + '&firstname=' + user.userName
                + '&puserid=' + user.partnerID
                + '&partner=' + user.partnerName
                + "&journey=" + treatData.journey;
    const typeformLink = source + treatData.id + "#" + params;// + "&" + previousAnswers;
 
    console.log("Navigation ->", navigation);
    
  return  <Background>
    <View style={styles.container}>
          <View style={styles.titleview}>
                <Text style={styles.title}>
                  {treatData.description} 
                </Text>
                <Button  
                  pressableStyle={styles.button}     
                  onPress={()=>{navigation.push("HomeScreen")}}
                  text={t("button")}
                />
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
    fontSize: fonts.normalSize,
   
    color: colors.text,
    justifyContent: "flex-start",
  },
  button:{
    width: "20%",
    alignSelf: "center"
  }
 
});
export default TreatScreen;