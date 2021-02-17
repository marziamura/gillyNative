// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import actionUserLogin from '../state/actionUserLogin';
import createStore from '../state/store';
import { useTranslation } from 'react-i18next';


import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground
} from 'react-native';
import getUserInfo from '../state/getUserInfo';



const SplashScreen = ({navigation}) => {
  const { t } = useTranslation('Splash');
  console.log(" loading SplashScreen ");
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
      console.log("Splash Screen UseEffect");
   
          //Check if user_id is set or not
          //If not then send for Authentication
          //else send to Home Screen
          console.log("Splash Screen UseEffect");
          Auth.currentAuthenticatedUser().then((cognitoUser)=>{
            console.log(" Splash Screen got user info ", cognitoUser);
            const currentUser = [{
                id: cognitoUser.username,
                partnerID: cognitoUser.attributes["custom:partnerID"],
                name: cognitoUser.attributes["name"],
                journey: cognitoUser.attributes["custom:journey"]
                
              }]
              let store = createStore();
              let initialState = store.getState().userInfo;
              store.dispatch(actionUserLogin(initialState, currentUser));
            
              let promiseResolve = (user)=>{
                console.log("promise resolve", user);
              
                if (!user || !user.sex){
                  console.log("got user info ", user);
                  navigation.replace('OnboardingNavigationRoutes');
                }else{
                  console.log("got user info ", user);
                 navigation.replace('HomeNavigationRoutes');
                }
              }
              let promiseReject = (error)=>{
                console.log("error", error)
              }
              
            getUserInfo().then(promiseResolve).catch(promiseReject);
              
        }).catch((error)=>{
          console.log("user not authenticated", error)
        
        });
    }, []);

  return (
    <ImageBackground source={require('../Image/background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.gilly}>
          Gilly
        </Text>
        <Text style={styles.text}>
          {t("splashText")}
        </Text>
        <View style={styles.button}>
          <Pressable
           onPress={() => {
            navigation.replace('AboutGillyNavigationRoutes');
           }}
          >
            <Text style={styles.buttontext}> 
            {t("button")}
            </Text>
          </Pressable> 
        </View>
        <View style={styles.signIn}>
        <Pressable
           onPress={() => {
            navigation.replace('Auth');
           }}
          >
          <Text >
              {t("signIn")}
          </Text> 
        </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default connect() (SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  //  backgroundColor: '#888888',
  },
  gilly:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    position: 'absolute',
    width: 327,
    height: 40,
  
    top: 206,
   // color: '#FFFFFF'
  },
  text:{
   // color: '#FFFFFF',
    fontSize: 21,
    fontFamily: 'Roboto',
    fontWeight: "500",
    lineHeight: 28,
    textAlign: 'center',
    position: 'absolute',
    width: 327,
    height: 84,

    top: 372,
  },
  buttontext:{
    color: '#000000',
    fontSize: 21,
  },
  button:{
   display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    position: "absolute",
    width: 327,
    height: 60,

    top: "80%",
    backgroundColor: "#FFF",
    borderRadius: 16
  },
  signIn:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: 327,
    height: 84,
    top: '90%',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  }
  
});