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


const OnboardingNavigationRoutes = (props) => {
  console.log("OnboardingNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="Gender"
    >
      <Stack.Screen
        name="About you"
        component={Gender}
        options={{
          title: 'About you', 
        }}
      />
     <Stack.Screen
        name="Onboarding1"
        component={Onboarding1}
        options={{
          title: 'Onboarding', 
        }}
      />
      <Stack.Screen
        name="Onboarding2"
        component={Onboarding2}
        options={{
          title: 'Onboarding', 
        }}
      />
    </Stack.Navigator>
  );
};



export default OnboardingNavigationRoutes;