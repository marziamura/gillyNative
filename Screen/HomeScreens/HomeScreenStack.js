// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from '../Components/NavigationDrawerHeader';
import TreatScreen from './TreatScreen';
import HomeScreen from './HomeScreen';


const Stack = createStackNavigator();


const HomeScreenStack = ({navigation}) => {
  console.log("homeScreenStack")
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#1DE7C0', //Set Header color
          },
          headerTintColor: '#383838', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
       <Stack.Screen
        name="TodaysTreat"
        component={TreatScreen}
        options={{
          title: 'Treat', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#1DE7C0', //Set Header color
          },
          headerTintColor: '#383838', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;