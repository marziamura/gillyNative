import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreen from './HomeScreens/HomeScreen';
import Feedback from './HomeScreens/FeedbackForm'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './HomeScreens/Profile'


const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
       />
      <Tab.Screen name="Feedback" component={Feedback}
          options={{
            tabBarLabel: 'Feedback',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="message" color={color} size={26} />
            ),
          }}
      />
       <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="face" color={color} size={26} />
            ),
          }}
      />
    </Tab.Navigator>
  );
}

 
export default HomeTabs;