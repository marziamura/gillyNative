// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import Background from '../Components/Background';
import Table from '../Components/Table'



import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Text from "../Components/GillyText";


const Profile = ({navigation}) => {
 
  
  return (
    <Background>
        <Table/>
    </Background>
  );
};

export default Profile;

