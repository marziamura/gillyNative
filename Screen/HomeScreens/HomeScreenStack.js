// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerHeader from '../Components/NavigationDrawerHeader';
import TreatScreen from './TreatScreen';
import InvitePartner from './InvitePartnerTF';
import IntimacyProfile from './IntimacyProfile';
import GeneralFeedback from './FeedbackForm';
import ExploreJourneys from './ExploreJourneys';
import TreatDone from './TreatDone';
import HomeScreen from './HomeScreen';
import ThankYou from './Thankyou';
import * as colors from '../Style/Style'

const Stack = createStackNavigator();


const HomeScreenStack = ({navigation}) => {

  return (
    <Stack.Navigator initialRouteName="HomeScreen"
     screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
     
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
      
      />
      <Stack.Screen
        name="IntimacyProfile"
        component={IntimacyProfile}
       
      />
      <Stack.Screen
        name="GeneralFeedback"
        component={GeneralFeedback}
      
      />
      <Stack.Screen
        name="ExploreJourney"
        component={ExploreJourneys}
       
      />
       <Stack.Screen
        name="TreatDone"
        component={TreatDone}
      
      />
       <Stack.Screen
        name="ThankYou"
        component={ThankYou}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;