import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Montserrat_400Regular as montserrat,
} from '@expo-google-fonts/montserrat';

import CApp from  "./app_prod.js"

const App = () => {
  let [fontsLoaded] = useFonts({
    montserrat,
});

if (!fontsLoaded) {
    return <AppLoading />;
}  
  return <CApp/>
}


export default App;