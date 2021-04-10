// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import MessageInABottle from './FirstTreat/MessageInABottle'
import FillTheBlanks from './FirstTreat/FillTheBlanks';
import ShareMessage from './FirstTreat/ShareMessage';


const Stack = createStackNavigator();

console.log("loading FirstTreatNavigationRoutes file");


const FirstTreatNavigationRoutes = (props) => {
  console.log("FirstTreatNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="MessageInABottle"
      headerTintColor={colors.background}
    >
      <Stack.Screen
        name="MessageInABottle"
        component={MessageInABottle}
        options={{
          title: 'You first gilly treat', //Set Header Title
           headerStyle: {
              backgroundColor: colors.header, //Set Header color
            },
            headerTintColor: colors.text, //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
      />
      <Stack.Screen
        name="FillTheBlanks"
        component={FillTheBlanks}
        options={{
          title: 'You first gilly treat', //Set Header Title
        }}
        options={{
          title: 'You first gilly treat', //Set Header Title
           headerStyle: {
              backgroundColor: colors.header, //Set Header color
            },
            headerTintColor: colors.text, //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
      />
       <Stack.Screen
        name="ShareMessage"
        component={ShareMessage}
        options={{
          title: 'You first gilly treat', //Set Header Title
           headerStyle: {
              backgroundColor: colors.header, //Set Header color
            },
            headerTintColor: colors.text, //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
      />
    </Stack.Navigator>
  );
};



export default FirstTreatNavigationRoutes;