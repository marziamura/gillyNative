// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as colors from '../Style/Style';
import Background from '../Components/Background';
import { IconButton } from 'react-native-paper';
import InfoDialog from '../Components/InfoDialog';




import {
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  StyleSheet
} from 'react-native';

console.log("Loading File RelationshipQuestion");

const RelationshipQuestion = (props) => {
  console.log("Loading RelationshipQuestion");
  const { t } = useTranslation("About4");
  const [disclaimer, setDisclaimerText] = React.useState("");
  const [pressedYes, setPressedYes] = React.useState(false);
  const [pressedNo, setPressedNo] = React.useState(false);
  const [name, setName] = React.useState("");
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);

  const openInfo = () =>{
    setInfoDialogOpen(true);
  }

  
  function OnChangeName(text){
    setName(text);
  }
 
  function closeInfoDialog(){
     setInfoDialogOpen(false);
 }
 
  
  const buttonText = {
    color:"#841584", 
    fontSize: 20,
  };
  const buttonArea = {
    borderWidth: 1,
    width: '80%'
  };

  return (
  <Background>
  <SafeAreaView style={{flex: 1}}>
   <View style={styles.container}>
     <View style={styles.topView}>
        <View style={styles.textView}>
   
            <Text style={styles.title}>
                {t("title")}
            </Text>
            <Text style={styles.text}>
                {t("text")}
            </Text>
        </View>
        <View style={styles.buttonView}>
          <Pressable  style={({pressed}) => [
                {
                  backgroundColor: pressedYes ? colors.disabled : colors.white,
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
                   {t("Yes")}
                </Text>
              </Pressable> 
              <Pressable 
               style={({pressed}) => [
                {
                  backgroundColor: pressedNo ? colors.disabled : colors.white,
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
                  {t("No")}
                </Text>
            </Pressable> 
           
        </View>
        <Text style={styles.disclaimer}> 
                {disclaimer}
        </Text>
       
      </View>
      {pressedYes && <View style={styles.textinputview}>
                            <Text> {t("PartnerName")}</Text>
                      <View style={{flexDirection: "row",  justifyContent:"center", alignContent:"center"}}>
                            <View style={{flex: 5}}>
                               
                                    <TextInput
                                    style={styles.textInput}
                                    label={t("PartnerName")}
                                    onChangeText={OnChangeName}
                                    placeholder={t("PartnerName")}
                                    value={name}
                                  />
                              </View>

                              <View style={{flex: 1}}>
                              <IconButton
                                  icon="information"  
                                  size={20}
                                  onPress={openInfo}
                                  style={styles.infoIcon}
                              />
                            </View>    
                        </View>
                    </View>
      }
       <View style={styles.bottomView}>
           <Pressable 
             style={styles.nextButton}
              onPress={() => {
                props.navigation.replace("MessageInABottle");
               }}
              >
              <Text style={styles.button} > 
                {t("button")}
              </Text>
            </Pressable> 
        </View>
        { infoDialogOpen ? <InfoDialog text={"infoPartnersName"} callback={closeInfoDialog}/> : null}
    </View>
    </SafeAreaView>
   </Background>
  
  );
};

export default RelationshipQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topView:{
      flex: 4,
      width: '100%',
      margin: 10,
  },
  textView: {
    width: '90%', 
    flex: 1,
  },
  buttonView: {
    width: '60%',
    flex: 1,
  },

  bottomView: {
    flex: 2,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  buttontext:{
    fontSize: 21,
    alignSelf: 'flex-start',
    marginLeft: 10
  },

  whitebutton:{
    alignItems: 'flex-start',
    justifyContent: 'center',
   
    height: 40,
   
    marginBottom: 20,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1
  },
  nextButton:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1
  },
  button:{
     backgroundColor: colors.buttonBackground,
     borderRadius: 24,
     borderWidth: 1,
   //  borderColor: colors.border
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
    width: '90%',
    left:   10,
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 22,
    color: 'red'
  },
  buttonStyle:{
    justifyContent: 'center',
    width: '100%',
    height: "30%",
    borderRadius: 24,
   },
    button : {
      color:"#841584", 
      fontSize: 20,
    },
    textInput:{
       borderWidth:1,
       borderRadius: 10,
       height: 40,
       borderColor: colors.border,
     },
    textinputview:{
    flex:1,
    width: "80%",
    padding: 10,
    
  },
  
});