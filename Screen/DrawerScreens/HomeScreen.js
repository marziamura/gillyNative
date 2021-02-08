// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
console.log("loading HomeScreen");



const HomeScreen = ({navigation}) => {

  console.log("******** HomeScreen ******** ");
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
      <Button
           onPress={() => navigation.replace("TodaysTreat")}
          title="DailyTreat"
          color="#841584"
          accessibilityLabel="Open your daily Treat"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;