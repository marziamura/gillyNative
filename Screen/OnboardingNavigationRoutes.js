// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import OnboardingScreen1 from './Onboarding/OnboardingScreen1';


const Stack = createStackNavigator();

console.log("loading DrawerNavigationRoutes file");


const OnboardingNavigationRoutes = (props) => {
  console.log("OnboardingNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
    >
      <Stack.Screen
        name="Welcome"
        component={OnboardingScreen1}
        options={{
          title: 'Welcome', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};



export default OnboardingNavigationRoutes;