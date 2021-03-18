// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import actionUserLogin from '../state/actionUserLogin';
import createStore from '../state/store';
import { useTranslation } from 'react-i18next';
import Button from './Components/Button'


import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground
} from 'react-native';
import {getUserInfo} from '../state/userInfo';



const SplashScreen = ({navigation}) => {
  const { t } = useTranslation('Splash');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
      console.log("Splash Screen UseEffect");
    //  navigation.replace('FirstTreatNavigationRoutes');

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
              console.log(" calling actionUserLogin ", initialState);
              store.dispatch(actionUserLogin(initialState, currentUser));
            
              let promiseResolve = (u)=>{
                console.log("promise resolve", u);
                if(!u){
                  navigation.replace('OnboardingNavigationRoutes');
                  return;
                }
                let user = u.data ? u.data.getUser : u;
                
                if (!user || !user.sex){
                  console.log("got user info ", user);
                  navigation.replace('FirstTreatNavigationRoutes');
                }else{
                  if(user.lastTreatInJourney === 0){
                    console.log("No treats yet ");
                    navigation.replace('FirstTreatNavigationRoutes');
                  }else{
                    console.log("some treats... ", user.lastTreatInJourney);
                    navigation.replace('HomeNavigationRoutes');
                  }
                }
              }
              let promiseReject = (error)=>{
                console.log("error", error)
              }
            console.log("calling getUserInfo");
            getUserInfo().then(promiseResolve).catch(promiseReject);
              
        }).catch((error)=>{
          console.log("user not authenticated", error)
          setShowButton(true);
          navigation.replace('AboutGillyNavigationRoutes');
        
        });
    }, []);
    const button = {
      color:"#841584", 
      fontSize: 20,
      
    };
    const button2 = {
      backgroundColor:"transparent", 
      width: '100%',
      borderWidth: 1
    };
  return (
    <ImageBackground source={require('../assets/background_gradient.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.gilly}>
          Gilly
        </Text>
        <Text style={styles.text}>
          {t("splashText")}
        </Text>
       {  showButton &&   <View style={styles.button}>
                          <Button 
                              press = { () => {
                                navigation.replace('AboutGillyNavigationRoutes');
                                    }}
                              title = {t("button")}
                              styletext={button}
                              styleover={button2}
                            />
                          </View>
        }
        {showButton && <View style={styles.signIn}>
          <Button
           press={() => {
            navigation.replace('Auth');
           }}
           title =  {t("signIn")}
          />
        </View>
        }
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
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: 40,
  
    top: 206,
   // color: '#FFFFFF'
  },
  text:{
   // color: '#FFFFFF',
    fontSize: 21,
  //  fontFamily: 'Roboto',
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
    position: "absolute",
    width: '80%',
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
    top: '85%',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  }
  
});