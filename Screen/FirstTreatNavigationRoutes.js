// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import MessageInABottle from './FirstTreat/MessageInABottle'
import FillTheBlanks from './FirstTreat/FillTheBlanks';
import ShareMessage from './FirstTreat/ShareMessage';
import RelationshipQuestion from './Onboarding/RelationshipQuestion';
import { IconButton, Colors } from 'react-native-paper';
import * as colors from './Style/Style';



const Stack = createStackNavigator();

console.log("loading FirstTreatNavigationRoutes file");


const FirstTreatNavigationRoutes = (props) => {
  console.log("FirstTreatNavigationRoutes")
  return (
    <Stack.Navigator
      initialRouteName="RelationshipQuestion"
      headerTintColor={colors.background}
    >
    <Stack.Screen
        name="RelationshipQuestion"
        component={RelationshipQuestion}
        options={{
          title: 'Before we begin', //Set Header Title
        
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
        name="MessageInABottle"
        component={MessageInABottle}
        options={{
          title: 'You first gilly treat', //Set Header Title
           headerStyle: {
              backgroundColor: colors.header, //Set Header color
            },
            headerTintColor: colors.text, //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                onPress={() => props.navigation.navigate("RelationshipQuestion")}
                title="Info"
                color="black"
              />
            ),
          }}
      />
      <Stack.Screen
        name="FillTheBlanks"
        component={FillTheBlanks}
        options={{
          title: 'You first gilly treat', //Set Header Title
        }}
        options={{
          title: 'You first gilly treat', //Set Header Title
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              onPress={() => props.navigation.navigate("MessageInABottle")}
              title="Info"
              color="black"
            />),
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
        name="ShareMessage"
        component={ShareMessage}
        options={{
          title: 'You first gilly treat', //Set Header Title
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



export default FirstTreatNavigationRoutes;