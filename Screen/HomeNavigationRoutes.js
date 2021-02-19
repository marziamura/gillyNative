// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens

import SettingsScreen from './HomeScreens/SettingsScreen';
import CustomSidebarMenu from './Components/CustomSideBarMenu.js';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import HomeScreenStack from './HomeScreens/HomeScreenStack';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

console.log("loading DrawerNavigationRoutes file");



const settingScreenStack = ({navigation}) => {
  console.log("settingScreenStack")
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#1DE7C0', //Set Header color
        },
        headerTintColor: '#F7E3CB', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigatorRoutes = (props) => {
  console.log("HomeNavigatorRoutes")
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        backgroundColor: '#1DE7C0',
        activeTintColor: '#1DE7C0',
        color: '#1DE7C0',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#1DE7C0',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}
      >
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Setting Screen'}}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};



export default HomeNavigatorRoutes;