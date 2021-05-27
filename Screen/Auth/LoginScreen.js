// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import actionSetUserInfo from '../../state/actionSetUserInfo';
import createStore from '../../state/store';
import {getUserInfo} from '../../state/userInfo';
import * as colors from '../Style/Style';
import Background from '../Components/Background';
import Button from '../Components/Button';
import { useTranslation } from 'react-i18next';


import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Dimensions
} from 'react-native';

var {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const LoginScreen = ({navigation,dispatch}) => {
  console.log("Login Screen");
  const { t } = useTranslation('Auth');
  var loginData = createStore().getState().loginData[0];
  console.log("Login Screen ", loginData);
  var email = (loginData.email === "") || (loginData.email=== "xxx") ? t("email") : loginData.email;
  const [userEmail, setUserEmail] = useState(email);
  const [userPassword, setUserPassword] = useState(loginData.password);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  const passwordInputRef = createRef();
  
  const userEmailRef = createRef();
  
  const handleSubmitPress = () => {
  
    if (!userEmailRef.current) {
      alert('Please fill Email');
      return;
    }
    if (!passwordInputRef.current) {
      alert('Please fill Password');
      return;
    }
    setButtonDisabled(true);
    signIn()
 };
 
 async function signIn() {
      let dataToSend = {username: userEmail.toLowerCase(), password: userPassword};
      console.log( "signing in ",dataToSend);
 
      Auth.signIn(dataToSend).then((cognitoUser)=>{
        console.log(cognitoUser);
        const userInfo = createStore().getState().userInfo[0];
        userInfo.userName =  cognitoUser.attributes["name"],
        userInfo.journey = cognitoUser.attributes["custom:journey"]
        userInfo.id = cognitoUser.username,
      
        console.log("+++++++++++++++++++++++>", userInfo)
        dispatch(actionSetUserInfo(userInfo, [userInfo]));

        //dispatch(actionUserLogin(createStore().getState().userInfo,user));

        let promiseResolve = (user)=>{
    
          if (!user || !user.sex){
           
            console.log("No User Info ", user);
            navigation.replace('OnboardingNavigationRoutes');
          }else{
    
            console.log("User info ", user);
            navigation.replace('HomeNavigationRoutes');
          }
        }
        let promiseReject = (error)=>{
          setButtonDisabled(false);
          console.log("error", error);
          alert("login error", error);
        }

        getUserInfo().then((u)=>{promiseResolve(u)}).catch((u)=>{promiseReject(u)});
        
     }).catch ((error)=> {
      let errorMessage =error.message;
      console.log(errorMessage);
      
      alert(errorMessage);
      setButtonDisabled(false);
  
   })
 }


  return (
 <Background>
  <View style={styles.mainBody}>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
       <View style={{flex: 1}}>
      <KeyboardAvoidingView enabled style={{flex: 1}}>
  
            <View style={styles.imageView}>
              <Image
                source={require('../../Image/gilly_logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                //  margin: 30,
                }}
              />
            </View>
            <View style={styles.textInputView}>
           <TextInput
             style={styles.inputStyle}
             onChangeText={(email) =>{

               setButtonDisabled(false);
               setUserEmail(email)
               }
             }
             placeholder={t("email")}
             placeholderTextColor={colors.placeholderText}
             keyboardType="default"
             ref={userEmailRef}
             onSubmitEditing={Keyboard.dismiss}
             blurOnSubmit={false}
             underlineColorAndroid={colors.underlineColor}
             returnKeyType="next"
             value={userEmail}
              />
            </View>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>{

                  setButtonDisabled(false);
                  setUserPassword(UserPassword)
                  }
                }
                placeholder={t("password")}
                placeholderTextColor={colors.placeholderText}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid={colors.underlineColor}
                value={userPassword}
                returnKeyType="next"
              />
              
            </View>
  
          <View style={styles.buttonsView}>
            <Button
               text = {t("login")}
             onPress={handleSubmitPress}
            />
          </View>
          <View style={styles.linksView}>
            <Pressable  onPress={() => navigation.navigate('RegisterScreen')}>
              <Text
                style={styles.registerTextStyle}
               >
              {t("goToRegister")}
              </Text>
            </Pressable>
            <Pressable  onPress={() => navigation.navigate('ConfirmEmail')}>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.replace('ConfirmEmail')}>
          {t("confirmEmail")}
            </Text>
            </Pressable>
            <Pressable  onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.registerTextStyle}>
            {t("forgotPassword")}
            </Text>
            </Pressable>
            </View>
           
     
            </KeyboardAvoidingView>

        </View>
      </ScrollView>
      <View style = {styles.container}>
            <ActivityIndicator
               animating = {buttonDisabled}
               color = {colors.violet}
               size = {100}
               style = {styles.activityIndicator}/>
   </View>
    </View>  
    </Background>
  );
};
export default connect() (LoginScreen);

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center', 
  },

  container: {
    position: "absolute",
    alignItems: "center",
    top: SCREEN_HEIGHT/2 - 50,
    left: SCREEN_WIDTH/2 - 50
  },
  
  imageView:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputView: {
    alignItems: 'center',
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textErrorView: {
    alignItems: 'center',
    height: 10,
  },
  buttonsView:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linksView:{
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  inputStyle: {
    //flex: 1,
    color: colors.text,
    height: '80%',
    width: '90%',
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
  },

  registerTextStyle: {
    color: colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
  },
  errorTextStyle: {
    color: colors.textError,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    color:"#841584", 
    fontSize: 20,
  },
  buttonStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderRadius: 30,
   },
   activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
 }

});