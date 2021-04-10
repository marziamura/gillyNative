// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as colors from '../Style/Style';
import { Button}  from 'react-native-paper';



import {
  View,
  StyleSheet,
} from 'react-native';



const AboutBase = (props) => {
  console.log("AboutBase", props, props.navigation)
  const { t } = useTranslation(props.namespace);
  const buttonText = {
    color:"#841584", 
    fontSize: 20,
  };
  const buttonArea = {
    borderWidth: 1,
    width: '100%'
  };

  return (
   
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
      <Button
        onPress={() => {
          props.navigation.replace(props.next);
         }}
         mode="outlined" 
         uppercase={false}
         contentStyle={styles.button}
         style={styles.buttonStyle}
        >
        {t("button")}
      </Button>
      </View>
      
    </View>
  
  );
};

export default AboutBase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer:{
    width: '90%', 
    height: '60%',
    padding: 10,
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
 
  title: {
    position: 'absolute',
    width: '100%',
    height: 80,
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
  },
  buttonStyle:{
    justifyContent: 'center',
    width: '100%',
    height: "30%",
    borderRadius: 30,
   },
    button : {
      color:"#841584", 
      fontSize: 20,
      width: '80%'
    },
});