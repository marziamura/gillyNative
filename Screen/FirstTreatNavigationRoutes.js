// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import FirstTreat1 from './FirstTreat/FirstTreat1'


const Stack = createStackNavigator();

console.log("loading FirstTreatNavigationRoutes file");


const FirstTreatNavigationRoutes = (props) => {
  console.log("FirstTreatNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="FirstTreat1"
    >
      <Stack.Screen
        name="FirstTreat1"
        component={FirstTreat1}
        options={{
          title: 'FirstTreat1', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};



export default FirstTreatNavigationRoutes;