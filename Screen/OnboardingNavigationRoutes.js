// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import Gender from './Onboarding/Gender';
import WelcomeScreen from './Onboarding/WelcomeScreen';
import RelationshipQuestion from './Onboarding/RelationshipQuestion';
import * as colors from './Style/Style'


const Stack = createStackNavigator();

console.log("loading OnboardingNavigationRoutes file");


const OnboardingNavigationRoutes = (props) => {
  console.log("OnboardingNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      headerTintColor={colors.background}
    >

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: 'Welcome', 
        }}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={{
          title: 'About you', 
        }}
      />
      <Stack.Screen
        name="RelationshipQuestion"
        component={RelationshipQuestion}
        options={{
          title: 'Before we begin', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};



export default OnboardingNavigationRoutes;