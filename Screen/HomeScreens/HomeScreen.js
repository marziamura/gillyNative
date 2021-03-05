// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Button from '../Components/Button';
import Background from '../Components/Background'
import createStore from '../../state/store';
import { updateUserInfo } from '../../state/getUserInfo';

console.log("loading HomeScreen");



const HomeScreen = ({navigation}) => {
  let store = createStore();
  console.log("******** HomeScreen ******** ");
  function press(){
    console.log("OnPress");
    navigation.replace("TodaysTreat")
  };

  const button = {
    color:"#841584", 
    fontSize: 20,
  };
  const pressable ={
    width : '80%',
  }
  
  React.useEffect(()=>{
    updateUserInfo().then(() => console.log("updated pushNotifciation Token"))
    .catch(error=> console.log(error))
  }, [])

  return (
    <Background>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.containerView}>
        <View style={styles.buttonView}>
          <Button       
              press={press}
              title="Daily Treat"
              styletext={button}
              styleover={pressable}
              accessibilityLabel="Open your daily Treat"
            />
        </View> 
    </View>
    </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  
  buttonView:{
       width: '100%',
       height: "100%",
       justifyContent: 'center',
       alignItems: 'center',
  },
  containerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

export default HomeScreen;