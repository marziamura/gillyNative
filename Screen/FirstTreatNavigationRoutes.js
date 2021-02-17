// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import MessageInABottle from './FirstTreat/MessageInABottle'


const Stack = createStackNavigator();

console.log("loading FirstTreatNavigationRoutes file");


const FirstTreatNavigationRoutes = (props) => {
  console.log("FirstTreatNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="MessageInABottle"
    >
      <Stack.Screen
        name="MessageInABottle"
        component={MessageInABottle}
        options={{
          title: 'You first gilly treat', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};



export default FirstTreatNavigationRoutes;