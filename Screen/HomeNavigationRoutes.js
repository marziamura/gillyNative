// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';




import CustomSidebarMenu from './Components/CustomSideBarMenu.js';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import HomeScreenStack from './HomeScreens/HomeScreenStack';
import * as colors from './Style/Style'


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
          backgroundColor: colors.header, //Set Header color
        },
        headerTintColor: colors.text, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
    </Stack.Navigator>
  );
};


const HomeNavigatorRoutes = (props) => {
  console.log("HomeNavigatorRoutes")
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        backgroundColor: colors.background,
        activeTintColor: colors.text,
        color: colors.text,
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: colors.text,
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}
      backBehavior="initialRoute"
      >
      <Drawer.Screen
        name="Home Screen" 
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