// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Tex} from 'react-native';
import Button from '../Components/Button'


import {
  View,
  StyleSheet,
  Image
} from 'react-native';



const Onboarding1 = ({navigation}) => {
 
  const [animating, setAnimating] = useState(true);


  return (
    <View style={styles.container}>
      <Button
        press={() => navigation.replace("Onboarding2")}
        title="Next"
        color="#841584"
        accessibilityLabel="Next"

      />
    </View>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
  }
});