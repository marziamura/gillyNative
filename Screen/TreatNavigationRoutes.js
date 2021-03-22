// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import Gender from './Onboarding/Gender';
import Onboarding1 from './Onboarding/Onboarding1';
import Onboarding2 from './Onboarding/Onboarding2';


const Stack = createStackNavigator();

console.log("loading OnboardingNavigationRoutes file");


const TreatNavigationRoutes = (props) => {
  console.log("OnboardingNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="Treat1"
    >
      <Stack.Screen
        name="Treat1"
        component={Treat1}
        options={{
          title: 'About you', //Set Header Title
        }}
      />
     <Stack.Screen
        name="Onboarding1"
        component={Onboarding1}
        options={{
          title: 'Onboarding', //Set Header Title
        }}
      />
      <Stack.Screen
        name="Onboarding2"
        component={Onboarding2}
        options={{
          title: 'Onboarding', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};



export default TreatNavigationRoutes;