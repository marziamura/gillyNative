// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import actionUserLogin from '../state/actionUserLogin';
import createStore from '../state/store';


import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import getUserInfo from '../state/getUserInfo';



const SplashScreen = ({navigation}) => {
 
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      console.log("Splash Screen UseEffect");
      Auth.currentAuthenticatedUser().then((cognitoUser)=>{
         console.log(" Splash Screen got user info ", cognitoUser);
         const user = [{
            id: cognitoUser.username,
            partnerID: cognitoUser.attributes["custom:partnerID"],
            name: cognitoUser.attributes["name"],
            journey: cognitoUser.attributes["custom:journey"]
          }]
          let store = createStore();
          let initialState = store.getState().authorizationStatus;
          store.dispatch(actionUserLogin(initialState, user));
          let promiseResolve = (user)=>{
            console.log("promise resolve", user);
            if (!user || user.sex === "xxx"){
              console.log("got user info ", user);
              navigation.replace('Welcome');
            }else{
              console.log("got user info ", user);
              navigation.replace('DrawerNavigationRoutes');
            }
          }
          let promiseReject = (error)=>{
            console.log("error", error)
            navigation.replace('Auth');
          }
          
          getUserInfo().then(promiseResolve).catch(promiseReject);
          
          
    }, 1000);
  })}, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/genders.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default connect() (SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});