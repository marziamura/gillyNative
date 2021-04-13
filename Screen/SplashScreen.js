
// Import React and Component
import React, {useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import actionUserLogin from '../state/actionUserLogin';
import createStore from '../state/store';
import { useTranslation } from 'react-i18next';
import Background from './Components/Background';
import * as colors from './Style/Style'


import {
  View,
  StyleSheet,
  Text,
  Pressable
} from 'react-native';
import {getUserInfo} from '../state/userInfo';


const viewWidth= '90%';

const SplashScreen = ({navigation}) => {
  const { t } = useTranslation('Splash');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(
          function() {
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
                userName: cognitoUser.attributes["name"],
                journey: cognitoUser.attributes["custom:journey"]
                
              }]
              let store = createStore();
              let initialState = store.getState().userInfo;
              console.log(" calling actionUserLogin ", currentUser);
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
                  if(user.lastTreatInJourney <= 0){
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
     //     navigation.replace('AboutGillyNavigationRoutes');
        
        });
      }, 10)
    }, []);

  return (
    <Background>
      <View style={styles.container}>
        <View style={[styles.textView, styles.centerContent]}>
          <Text style={[styles.gilly,  styles.centerContent]}>
            Gilly
          </Text>
        </View>
        <View style={[styles.textView,  styles.centerContent]}>
          <Text style={styles.text}>
            {t("splashText")}
          </Text>
        </View>
        <View style={styles.buttonView}>
                         
                                <Pressable 
                                
                                  onPress = { () => {
                                  console.log('Pressed')
                                  navigation.replace('AboutGillyNavigationRoutes');
                                  }}
                                  style={styles.button}
                                >
                                     <Text style={[styles.centerContent, styles.buttonText]}>
                                     {t("button")}
                                     </Text>
                                </Pressable>
      
          <Pressable
           onPress={() => {
            navigation.replace('Auth');
           }}
           >
             <Text style={[styles.centerContent, styles.buttonText]}>
                {t("signIn")}
            </Text>
          </Pressable>
        </View>
        
      </View>
   </Background>
  );
};

export default connect() (SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  gilly:{
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
 //   marginTop: 100,
  },
  textView:{
    flex: 1,
    marginTop: 100,
    width: viewWidth,
  },
  text:{
    fontSize: 21,
    fontWeight: "500",
    lineHeight: 28,
    textAlign: 'center',  
    width: 327,
    height: 84,
  },
  buttonText:{
    fontSize: 15,
    fontWeight: "500",
    textAlign: 'center',  
    justifyContent: 'center',
    color: colors.buttonText,
  },

  buttonView:{
    flex: 1,
    width: viewWidth,
    justifyContent: 'center'
  },
  button:{
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 24,
    width: '100%',
    height: 40,
    justifyContent: 'center'
  },
  signInView:{
    flex: 1,
    alignItems: 'center',
    width: '80%',
    borderWidth: 0
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },  
  centerContent:{
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
});