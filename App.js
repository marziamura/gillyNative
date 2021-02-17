// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

import Amplify from 'aws-amplify'
import config from './aws-exports'


// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/Auth/LoginScreen';
import RegisterScreen from './Screen/Auth/RegisterScreen';
import ConfirmEmail from './Screen/Auth/ConfirmEmail';
import HomeNavigationRoutes from './Screen/HomeNavigationRoutes';
import FirstTreatNavigationRoutes from './Screen/FirstTreatNavigationRoutes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'

import createStore from './state/store';
import OnboardingNavigationRoutes from './Screen/OnboardingNavigationRoutes';
import AboutGillyNavigationRoutes from './Screen/AboutGillyNavigationRoutes';
import './i18n';

Amplify.configure(config)

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
       <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{
          title: 'Confirm Email', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};



const App = () => {
  let store = createStore();
  return (
    <Provider store={store}>
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="HomeNavigationRoutes"
          component={HomeNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
         name="OnboardingNavigationRoutes"
         component={OnboardingNavigationRoutes}
         // Hiding header for Navigation Drawer
         options={{headerShown: false}}
        />
         <Stack.Screen
         name="FirstTreatNavigationRoutes"
         component={FirstTreatNavigationRoutes}
         // Hiding header for Navigation Drawer
         options={{headerShown: false}}
        />
        <Stack.Screen
         name="AboutGillyNavigationRoutes"
         component={AboutGillyNavigationRoutes}
         // Hiding header for Navigation Drawer
         options={{headerShown: false}}
        />
      </Stack.Navigator>
   
    </NavigationContainer>
    </Provider>
  );
};

export default App;