// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import { useTranslation } from 'react-i18next';


import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground
} from 'react-native';



const AboutBase = (props) => {
  console.log("AboutBase", props, props.navigation)
  const { t } = useTranslation(props.namespace);
  
  return (
    <ImageBackground source={require('../../Image/background.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
 
      <Text style={styles.title}>
           {t("title")}
      </Text>
      <Text style={styles.text}>
           {t("text")}
      </Text>
      <View style={styles.button}>
          <Pressable
           onPress={() => {
            props.navigation.replace(props.next);
           }}
          >
            <Text style={styles.buttontext}> 
            {t("button")}
            </Text>
          </Pressable> 
      </View>
      
    </View>
    </ImageBackground>
  );
};

export default AboutBase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  buttontext:{
    color: '#000000',
    fontSize: 21,
  },
  button:{
   display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    position: "absolute",
    width: 327,
    height: 40,
     
    top: "80%",
    backgroundColor: "#FFF",
    borderRadius: 16
  },
  title: {
    position: 'absolute',
    width: 327,
    height: 40,
    left:   24,
    top: "40%",
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center'
  },
  text: {
    position: 'absolute',
    width: 327,
    height: 84,
    left:   24,
    top: "60%",
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'center'
  }
});