// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from '../Components/NavigationDrawerHeader';
import TreatScreen from './TreatScreen';
import InvitePartner from './InvitePartner';
import IntimacyProfile from './IntimacyProfile';
import ExploreJourneys from './ExploreJourneys';
import TreatDone from './TreatDone';
import HomeScreen from './HomeScreen';
import ThankYou from './Thankyou';
import * as colors from '../Style/Style'

const Stack = createStackNavigator();


const HomeScreenStack = ({navigation}) => {

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
            backgroundColor: colors.header, //Set Header color
          },
          headerTintColor: colors.text, //Set Header text color
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
            backgroundColor: colors.header, //Set Header color
          },
          headerTintColor: colors.text, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="InvitePartner"
        component={InvitePartner}
        options={{
          title: 'Invite Partner', //Set Header Title
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
        }}
      />
      <Stack.Screen
        name="IntimacyProfile"
        component={IntimacyProfile}
        options={{
          title: 'Intimacy Profile', //Set Header Title
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
        }}
      />
      <Stack.Screen
        name="ExploreJourney"
        component={ExploreJourneys}
        options={{
          title: 'Explore journey', //Set Header Title
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
        }}
      />
       <Stack.Screen
        name="TreatDone"
        component={TreatDone}
        options={{
          title: 'Treat completed', //Set Header Title
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
        }}
      />
       <Stack.Screen
        name="ThankYou"
        component={ThankYou}
        options={{
          title: 'Thank you', //Set Header Title
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
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;