// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Button from '../Components/Button';
import Background from '../Components/Background'
console.log("loading HomeScreen");



const HomeScreen = ({navigation}) => {

  console.log("******** HomeScreen ******** ");
  function press(){
    console.log("OnPress");
    navigation.replace("TodaysTreat")
  }
  return (
    <Background>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={styles.buttonView}>
          <Button       
              press={press}
              text="Daily Treat"
              color="#841584"
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
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%',
       height: "100%",
  },
  container: {
    flex: 1,
    
  },

})

export default HomeScreen;