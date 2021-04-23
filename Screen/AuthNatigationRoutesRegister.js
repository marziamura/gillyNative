
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Auth/LoginScreen';
import RegisterScreen from './Auth/RegisterScreen';
import ConfirmEmail from './Auth/ConfirmEmail';
import ForgotPassword from './Auth/ForgotPassword';
import ForgotPasswordSubmit from './Auth/ForgotPasswordSubmit';
import * as colors from './Style/Style'

const Stack = createStackNavigator();

function AuthNavigationRoutesRegister() {
  
    return (
      <Stack.Navigator initialRouteName="RegisterScreen">
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
    
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password', //Set Header Title
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
          name="ForgotPasswordSubmit"
          component={ForgotPasswordSubmit}

          options={{
            title: 'Forgot Password', //Set Header Title
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
          name="ConfirmEmail"
          component={ConfirmEmail}
          options={{
            title: 'Confirm Email', //Set Header Title
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

  export default AuthNavigationRoutesRegister;
  
  