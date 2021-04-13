// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import createStore from '../../state/store';


import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import actionSetUserRegistered from '../../state/actionSetUserRegistered';



const Onboarding2 = ({navigation}) => {
 
  const store = createStore();
  function saveUserInfo(){
      let userInfo = store.getState().userInfo[0];
      if(userInfo){ //I need to set myself as partner on my partner's
        userInfo.journey = 'Solo';
        delete userInfo.password;
        userInfo.userName = 'xxx';
        userInfo.email = "xxx@yyy";
        userInfo.tel = "012345678";
        userInfo.partnerID = "none";
        console.log("saving user data", userInfo);
        if(userInfo.registered){
          API.graphql(graphqlOperation(mutations.updateUser, {input: userInfo}))
          .then((u)=>{
            console.log("Updated primary user ", u);
            store.dispatch(actionSetUserRegistered(store.getState().userInfo));
            naviga
            lace("FirstTreatNavigationRoutes");
          }).catch((e)=>{
            console.log(e);
            navigation.replace("FirstTreatNavigationRoutes");
          })
        }else{
          API.graphql(graphqlOperation(mutations.createUser, {input: userInfo})).then((user)=>{
            console.log("Updated primary user ", u);
            navigation.replace("FirstTreatNavigationRoutes");
          }).catch((error)=>{
            console.log(error);
            navigation.replace("FirstTreatNavigationRoutes");
          });
        }

        
      }else{
        console.log("no userInfo provided");      
      }
  
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Image/genders.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <Text>
           Finish Onboarding
      </Text>
      <Button
        onPress={() => saveUserInfo()}
        title="Go To Home"
        color="#841584"
        accessibilityLabel="go to home"
      />
      
    </View>
  );
};

export default Onboarding2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  }
});