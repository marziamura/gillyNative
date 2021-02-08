// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
console.log("loading HomeScreen");



const TreatScreen = () => {

  return (
      <WebView   source={{ uri: 'https://app.getgilly.com' }} 
       style={styles.html}/>    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
  
    },
    html: {
      marginTop: 20,
      maxHeight: '100%',
      width: '100%'
    }
  });

export default TreatScreen;