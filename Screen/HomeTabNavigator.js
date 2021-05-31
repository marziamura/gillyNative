import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreenStack from './HomeScreens/HomeScreenStack';
import Feedback from './HomeScreens/FeedbackForm'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './HomeScreens/Profile'


const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
    barStyle={{ backgroundColor: '#ffff' }}>
      <Tab.Screen name="Home" component={HomeScreenStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="home" color={color} size={26} />
        ),
      }}
       />
      <Tab.Screen name="Feedback" component={Feedback}
          options={{
            tabBarLabel: 'Feedback',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="feedback" color={color} size={26} />
            ),
          }}
      />
       <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={26} />
            ),
          }}
      />
    </Tab.Navigator>
  );
}

 
export default HomeTabs;