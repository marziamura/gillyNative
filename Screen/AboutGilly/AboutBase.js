// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as colors from '../Style/Style'



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
    <ImageBackground source={require('../../assets/background_gradient.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
    <View style={styles.textcontainer}>
        <Text style={styles.title}>
            {t("title")}
        </Text>
        <Text style={styles.text}>
            {t("text")}
        </Text>
      </View>
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
    justifyContent: 'flex-start',
  },
  textcontainer:{
    width: '100%', height: '60%',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  buttontext:{
    fontSize: 21,
    color: colors.buttonText
  },
  button:{
    backgroundColor: colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 16,
    width: '80%',
    height: 40,
  },
  title: {
    position: 'absolute',
    width: '100%',
    height: 40,
    top: "20%",
  //  fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    color: colors.text
  },

  text: {
    position: 'absolute',
    width: '100%',
    height: 84,
    top: "60%",
   // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'center',
    color: colors.text
  }
});