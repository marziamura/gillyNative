// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as colors from '../Style/Style';
import Background from '../Components/Background';
import { IconButton } from 'react-native-paper';
import InfoDialog from '../Components/InfoDialog';
import createStore from '../../state/store';
import Button from '../Components/Button';
import actionSetUserInfo from '../../state/actionSetUserInfo'
import {updateUserInfo} from '../../state/userInfo'
import * as Fonts from '../Style/Fonts'



import {
  View,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';

console.log("Loading File RelationshipQuestion");

const RelationshipQuestion = (props) => {
  console.log("Loading RelationshipQuestion");
  const { t } = useTranslation("About4");
  const [disclaimer, setDisclaimerText] = React.useState("");
  const [yesText, setYesText] = React.useState("");
  const [pressedYes, setPressedYes] = React.useState(false);
  const [pressedNo, setPressedNo] = React.useState(false);
  const [name, setName] = React.useState("");
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  
  let store = createStore();

  const openInfo = () =>{
    setInfoDialogOpen(true);
  }

  
  function OnChangeName(text){
    setName(text);
  }
 
  function closeInfoDialog(){
     setInfoDialogOpen(false);
 }
 
  
  

  let onPress = () =>{
    if(name !== "" ){
        var userInfo  = store.getState().userInfo[0];
        userInfo.partnerName = name;
        store.dispatch(actionSetUserInfo(userInfo, [userInfo]));
  
        updateUserInfo(userInfo).then((u)=>{
        console.log("UserInfo was saved", userInfo);
         props.navigation.replace("FirstTreatNavigationRoutes");
        }).catch((e)=>{
        console.log("Error saving userInfo ", e);
         props.navigation.replace("FirstTreatNavigationRoutes");
      })
    }

  }
  
  return (
  <Background>
  <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
         flex: 1,
         alignContent: 'center',
    }}>
       <KeyboardAvoidingView enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container]}
            
        >
 
     
        <View style={styles.textView}>
   
            <Text style={styles.title}>
                {t("title")}
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
                setYesText(t("yesText"));
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
                setYesText(t(""));
              }}
              >
                <Text style={styles.buttontext}> 
                  {t("No")}
                </Text>
            </Pressable> 
           
        </View>

      
      
      <View style={styles.textinputview}>
      <Text style={styles.disclaimer}> 
                {disclaimer}
      </Text>
      <Text style={styles.yesText}> 
                {yesText}
      </Text>
      {pressedYes && <React.Fragment>
                     <Text style={{includeFontPadding : true}}> {t("PartnerName")}</Text>
                      <View style={styles.row}>
                            <View style={{flex: 5}}>
                               
                              <TextInput
                                    style={styles.textInput}
                                    label={t("PartnerName")}
                                    onChangeText={OnChangeName}
                                    placeholder={t("NameSuggestion")}
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
            </React.Fragment>
      }
      </View>
       <View style={styles.bottomView}>
         <Button
             onPress={onPress}
             text={t("button")}
         />
         
        </View>
        { infoDialogOpen ? <InfoDialog text={"infoPartnersName"} callback={closeInfoDialog}/> : null}
  
    </KeyboardAvoidingView>
    </ScrollView>
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

  textView: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  buttonView: {
    width: '60%',
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 10
  },

  bottomView: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
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

  title: {
    width: '90%',
    fontStyle: 'normal',
    fontWeight: Fonts.titleWeight,
    fontSize:  Fonts.titleSize,

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

  yesText:{
    left:   10,
    fontStyle: 'normal',
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 10
  },

 textInput:{
       borderWidth:1,
       borderRadius: 10,
       height: "100%",
       fontSize: 20,
       borderColor: colors.border,
       padding: 10, 
 },
 textinputview:{
    flex:2,
    width: "90%",
    padding: 10,   
    justifyContent:"center", 
  },
  row:{
    flexDirection: "row", 
  ///  justifyContent:"center", 
    alignItems:"center",
    height: "30%"
  }
  
});