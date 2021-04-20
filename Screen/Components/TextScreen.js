// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as colors from '../Style/Style';
import Button from './Button';



import {
  View,
  StyleSheet
} from 'react-native';



const TextScreen = (props) => {

  const { t } = useTranslation(props.namespace);

  return (
   
    <View style={[styles.container, styles.centerContent]}>
       
       <View style={[styles.centerContent, {flex: 1, width: "80%"}]}>
        <Text style={styles.title}>
            {t("title")}
        </Text>
       </View>
       <View style={[styles.centerContent, {flex: 3, width: "95%"}]}>
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

export default TextScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },  
 
  title:{
    width: '100%',
  //  fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    color: colors.text
  },

  text: {
    width: '80%',
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
    flex: 2
   },
   centerContent:{
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  
});