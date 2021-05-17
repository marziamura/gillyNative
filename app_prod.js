
import 'react-native-gesture-handler';


import React, { useState, useEffect, useRef } from 'react';

import Amplify from 'aws-amplify'
import config from './aws-exports'


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import SplashScreen from './Screen/SplashScreen';

//import HomeNavigationRoutes from './Screen/HomeNavigationRoutes';
import HomeNavigationRoutes from './Screen/HomeTabNavigator';
import FirstTreatNavigationRoutes from './Screen/FirstTreatNavigationRoutes';
import { Provider } from 'react-redux'

import createStore from './state/store';
import OnboardingNavigationRoutes from './Screen/OnboardingNavigationRoutes';
import AboutGillyNavigationRoutes from './Screen/AboutGillyNavigationRoutes';
import AuthNavigationRoutes from './Screen/AuthNatigationRoutes';
import AuthNavigationRoutesRegister from './Screen/AuthNatigationRoutesRegister';
import './i18n';
import registerForPushNotificationsAsync from './notifications/pushNotifications'
import * as Notifications from 'expo-notifications';
import actionSetPushNotificationToken from './state/actionSetPustNotificationToken'
import { Provider as PaperProvider } from 'react-native-paper';
Amplify.configure(config)

const Stack = createStackNavigator();


const App = () => {
  let store = createStore();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  useEffect(() => {
    if(!window.location){
    registerForPushNotificationsAsync().then(token =>
      { 
        console.log("Push Notifcation Token:", token);
        setExpoPushToken(token);
        let userInfo = store.getState().userInfo[0]
        userInfo.pushNotificationToken = token
        store.dispatch(actionSetPushNotificationToken(store.getState().userInfo, [userInfo]));
      });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }
  }, []);


  return (
    <Provider store={store}>
      <PaperProvider>

        <NavigationContainer>
        
          <Stack.Navigator initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}>
          
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            
            <Stack.Screen
              name="AuthNavigationRoutes"
              component={AuthNavigationRoutes}
              options={{headerShown: false}}
            />
        
            <Stack.Screen
              name="AuthNavigationRoutesRegister"
              component={AuthNavigationRoutesRegister}
              options={{headerShown: false}}
            />
    
            <Stack.Screen
              name="HomeNavigationRoutes"
              component={HomeNavigationRoutes}
              options={{headerShown: false}}
            />
            <Stack.Screen
            name="OnboardingNavigationRoutes"
            component={OnboardingNavigationRoutes}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="FirstTreatNavigationRoutes"
            component={FirstTreatNavigationRoutes}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="AboutGillyNavigationRoutes"
            component={AboutGillyNavigationRoutes}
            options={{headerShown: false}}
            />
       
          </Stack.Navigator>
      
        </NavigationContainer>
      
        </PaperProvider>
    </Provider>
  );
};

export default App;