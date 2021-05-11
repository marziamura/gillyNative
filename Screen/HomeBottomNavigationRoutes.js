// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';
import * as colors from './Style/Style'


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenStack from './HomeScreens/HomeScreenStack';
import Thankyou from './HomeScreens/Thankyou';


const Tab = createBottomTabNavigator();

function HomeNavigatorRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreenStack} />
      <Tab.Screen name="Thank You" component={Thankyou} />
    </Tab.Navigator>
  );
}


export default HomeNavigatorRoutes;