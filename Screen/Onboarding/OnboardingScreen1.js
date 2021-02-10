// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Text} from 'react-native';


import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';



const OnboardingScreen1 = ({navigation}) => {
 
  const [animating, setAnimating] = useState(true);


  return (
    <View style={styles.container}>
      <Image
        source={require('../../Image/genders.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <Text>
           Start onboarding now
      </Text>
      
    </View>
  );
};

export default connect() (OnboardingScreen1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  }
});