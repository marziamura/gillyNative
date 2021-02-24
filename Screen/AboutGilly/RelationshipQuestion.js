// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../Components/Button'


import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground
} from 'react-native';

console.log("Loading File RelationshipQuestion");

const RelationshipQuestion = (props) => {
  console.log("Loading RelationshipQuestion");
  const { t } = useTranslation("About4");
  const [disclaimer, setDisclaimerText] = React.useState("");
  const [pressedYes, setPressedYes] = React.useState(false);
  const [pressedNo, setPressedNo] = React.useState(false);
 
 
  
  const buttonText = {
    color:"#841584", 
    fontSize: 20,
  };
  const buttonArea = {
    borderWidth: 1,
    width: '80%'
  };

  return (
    <ImageBackground source={require('../../Image/background.png')} style={styles.backgroundImage}>
   <View style={styles.container}>
        <View style={styles.textcontainer}>
   
            <Text style={styles.title}>
                {t("title")}
            </Text>
            <Text style={styles.text}>
                {t("text")}
            </Text>
        </View>
        <View style={styles.buttonscontainer}>
          <Pressable  style={({pressed}) => [
                {
                  backgroundColor: pressedYes ? '#d5d5d5' : '#FFFF',
                },
                styles.whitebutton,
              ]} 
              onPress={() => {
                setPressedNo(false)
                setPressedYes(true)
                setDisclaimerText("");
              }}
              >
                <Text style={styles.buttontext}> 
                Yes
                </Text>
              </Pressable> 
              <Pressable 
               style={({pressed}) => [
                {
                  backgroundColor: pressedNo ? '#d5d5d5' : '#FFFF',
                },
                styles.whitebutton,
              ]} 
              onPress={() => {
                setPressedNo(true);
                setPressedYes(false);
                setDisclaimerText(t("disclaimer"));
              }}
              >
                <Text style={styles.buttontext}> 
                No
                </Text>
            </Pressable> 
        </View>
        <View style={styles.bottom}>
            <Text style={styles.disclaimer}> 
                {disclaimer}
            </Text>
            <Button
              press={()=>  props.navigation.replace("Auth")}
              title={t('button')}
              styletext={buttonText}
              styleover={buttonArea}
              accessibilityLabel="Sign In"
            />
          
        </View>
    </View>
    </ImageBackground>
  
  );
};

export default RelationshipQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textcontainer: {
    width: '100%', height: '30%',
 
  },
  buttonscontainer: {
    width: '100%', height: '30%',
 
  },
  bottom: {
    width: '100%', height: '40%',

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
    alignSelf: 'flex-start',
    marginLeft: 10
  },

  whitebutton:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    left: 10,
   // marginBottom: 20,
    marginTop: 15,
    borderColor: "#000000a0",
    borderRadius: 10,
    borderWidth: 1
  },
  button:{
     position: "absolute",
     width: '80%',
     height: 40,
     top: "50%",
     backgroundColor: "#FFF",
     borderRadius: 16,
     borderWidth: 1,
  },

  title: {
    position: 'absolute',
    width: '90%',
    left:   10,
  //  top: "5%",
  //  fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    marginTop: 10,
   
  },


  text: {
    position: 'absolute',
    width: '90%',
    left:   10,
    top: "50%",
  //  fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 22,
    marginTop: 20,
  },
  
  disclaimer: {
    position: 'absolute',
    width: '90%',
    left:   10,
    top: 0,
  //  fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 22,
    marginTop: 20,
    color: 'red'
  }
});