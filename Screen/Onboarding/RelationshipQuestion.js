import React from 'react';
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
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';


import {
  View,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';

import Text from "../Components/GillyText";

console.log("Loading File RelationshipQuestion");

const RelationshipQuestion = (props) => {
  console.log("Loading RelationshipQuestion");
  const { t } = useTranslation("About4");
  const [disclaimer, setDisclaimerText] = React.useState("");
  const [yesText, setYesText] = React.useState("");
  const [pressedYes, setPressedYes] = React.useState(false);
  const [pressedNo, setPressedNo] = React.useState(false);
  const [coupleId, setCoupleId] = React.useState(null);
  const [name, setName] = React.useState("");
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  
  let store = createStore();

  const openInfo = () =>{
    setInfoDialogOpen(true);
  }

  
  function OnChangeName(text){
    setName(text);
  }
  function OnChangeCode(text){
    setCoupleId(text);
  }
 
  function closeInfoDialog(){
     setInfoDialogOpen(false);
 }

  
 function Buttons()
 {
  return <View style={styles.buttonRowView}>
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
        </View>
        <View style={styles.buttonView}>      
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
  </View>
  }
 
  

 /* let onPress = () =>{
    var userInfo  = store.getState().userInfo[0];
    if(name !== "" || coupleId ){
       
        userInfo.partnerName = name;
        userInfo.coupleId = coupleId;
        store.dispatch(actionSetUserInfo(userInfo, [userInfo]));
    
        updateUserInfo(userInfo).then((u)=>{
        console.log("UserInfo was saved", userInfo);
        if(coupleId){
            var coupleData ={
              id: coupleId,
              partnerBId: userInfo.id  
            }
            API.graphql(graphqlOperation(mutations.updateCouple, {input: coupleData})).then((data)=>{
              console.log("updated Data for Couple ", data);  
            }).catch((error)=>{
              console.log("updating Data failed", error);
            });
        }
         props.navigation.replace("FirstTreatNavigationRoutes");
        }).catch((e)=>{
        console.log("Error saving userInfo ", e);
         props.navigation.replace("FirstTreatNavigationRoutes");
      })
    }

  }*/
  function udpateUserInfo(userInfo){
   
    store.dispatch(actionSetUserInfo(userInfo, [userInfo]));
    updateUserInfo(userInfo).then((u)=>{
      console.log("UserInfo was saved", userInfo);
    }).catch((error)=>{
      console.log("Could not update userInfo");
    })
  }

  let onPress = () =>{
    var userInfo  = store.getState().userInfo[0];
    if(name !== "" || coupleId ){
       
        userInfo.partnerName = name;
      
        if(coupleId){
            var coupleData ={
              id: coupleId,
              partnerBId: userInfo.id  
            }
            API.graphql(graphqlOperation(mutations.updateCouple, {input: coupleData})).then((data)=>{
              console.log("updated Data for Couple ", data, data.data.updateCouple.partnerAId);  
              userInfo.coupleId = coupleId;
              userInfo.partnerID = data.data.updateCouple.partnerAId;
              udpateUserInfo(userInfo)
              props.navigation.replace("FirstTreatNavigationRoutes");
            }).catch((error)=>{
              alert("invalid code");
            });
        }else{
          if(name !== ""){
            udpateUserInfo(userInfo);
            props.navigation.replace("FirstTreatNavigationRoutes");
          }
        }
    }else{
      props.navigation.replace("FirstTreatNavigationRoutes");
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
 
     
        <View style={styles.titleView}>
            <Text style={styles.title}>
                {t("title")}
            </Text>
        </View>

             <Buttons/>


      
      
      <View style={styles.textinputview}>
          <Text style={styles.disclaimer}> 
                    {disclaimer}
          </Text>
          <Text style={styles.yesText}> 
                    {yesText}
          </Text>
          {pressedYes && <React.Fragment>
                        <Text> {t("PartnerName")}</Text>
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
                          <Text style={{includeFontPadding : true}}> {t("coupleCode")}</Text>
                          <View style={styles.row}>
                                  
                                  <TextInput
                                        style={styles.textInput}
                                        label={t("partnerCode")}
                                        onChangeText={OnChangeCode}
                                        placeholder={t("Your 5 digit code...")}
                                        value={coupleId}
                                  />
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleView: {
    flex: 0.5,
    justifyContent: 'center',
    width: "90%"
  },

  buttonRowView: {
    width: '80%',
    flexDirection: "row",
    flex: 0.5
  },

  buttonView: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
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
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    width: "80%"
  },

  title: {
    fontStyle: 'normal',
    fontWeight: Fonts.titleWeight,
    fontSize:  Fonts.titleSize,
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
    justifyContent:"space-between", 
  },
  row:{
    flexDirection: "row", 
  ///  justifyContent:"center", 
    alignItems:"center",
   
  }
  
});