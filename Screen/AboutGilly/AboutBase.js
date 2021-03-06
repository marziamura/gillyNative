// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as colors from '../Style/Style';
import Button from '../Components/Button';



import {
  View,
  StyleSheet
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
      <View style={[styles.buttonView, styles.centerContent]}>

      <Button
      text = {t("button")}
      onPress={() => {
        props.navigation.replace(props.next);
        }}
      />
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
  buttonView:{
    justifyContent: 'center',
    width: '80%',
    borderRadius: 30,
   },
   centerContent:{
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  
});