// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import AboutGilly1 from './AboutGilly/AboutGilly1';
import AboutGilly2 from './AboutGilly/AboutGilly2';
import AboutGilly3 from './AboutGilly/AboutGilly3';
import RelationshipQuestion from './AboutGilly/RelationshipQuestion';


const Stack = createStackNavigator();

console.log("loading OnboardingNavigationRoutes file");


const AboutGillyNavigationRoutes = (props) => {
  console.log("AboutGillyNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="AboutGilly1"
    >
      <Stack.Screen
        name="AboutGilly1"
        component={AboutGilly1}
        options={{
          title: 'Welcome', //Set Header Title
        }}
      />
     <Stack.Screen
        name="AboutGilly2"
        component={AboutGilly2}
        options={{
          title: 'Gilly helps', //Set Header Title
        }}
      />
      <Stack.Screen
        name="AboutGilly3"
        component={AboutGilly3}
        options={{
          title: 'Treat yourself...', //Set Header Title
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



export default AboutGillyNavigationRoutes;