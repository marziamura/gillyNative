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



const RelationshipQuestion = (props) => {

  const { t } = useTranslation("About4");
  const [disclaimer, setDisclaimerText] = React.useState("");
  const [pressedYes, setPressedYes] = React.useState(false);
  const [pressedNo, setPressedNo] = React.useState(false);

  return (
    <ImageBackground source={require('../../Image/background.png')} style={styles.backgroundImage}>
   <View style={styles.container}>
        <View style={styles.textcontainer}>
        <Text style={styles.supertitle}>
                {t("supertitle")}
            </Text>
            <Text style={styles.title}>
                {t("title")}
            </Text>
            <Text style={styles.text}>
                {t("text")}
            </Text>
        </View>
        <View style={styles.buttonscontainer} pressed={pressedNo}>
          <Pressable  style={({pressed}) => [
                {
                  backgroundColor: pressedYes ? '#d5d5d5' : '#F3F3F3',
                },
                styles.whitebutton,
              ]} 
              onPress={() => {
                setPressedNo(false)
                setPressedYes(true)
                props.navigation.replace(props.next);
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
            <Pressable style={styles.button}
              onPress={() => {
                props.navigation.replace("Auth");
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
    paddingLeft: 10
  },
  whitebutton:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    left: 10,
    marginBottom: 20,
    borderColor: "#000000a0",
    borderRadius: 10,
    borderWidth: 1
  },
  button:{
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     padding: 16,
     position: "absolute",
     width: '80%',
     height: 60,
     left: 10,
     top: "50%",
     backgroundColor: "#FFF",
     borderRadius: 16
  },

  title: {
    position: 'absolute',
    width: '90%',
    left:   10,
    top: "15%",
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 30,
    marginTop: 10,
   
  },

  supertitle: {
    position: 'absolute',
    width: '80%',
    left:   10,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 45,
    
  },

  text: {
    position: 'absolute',
    width: '90%',
    left:   10,
    top: "50%",
    fontFamily: 'Montserrat',
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
    top: '0',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 22,
    marginTop: 20,
    color: 'red'
  }
});