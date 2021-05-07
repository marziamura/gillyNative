// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { Auth } from 'aws-amplify';
import actionSetLoginData from '../../state/actionSetLoginData';
import { connect } from 'react-redux';
import * as colors from '../Style/Style';
import createStore from '../../state/store';
import Background from '../Components/Background';
import Button from '../Components/Button';
import { useTranslation } from 'react-i18next';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';


const RegisterScreen = (props) => {
  const { t } = useTranslation('Auth');
  let store = createStore(); 
  let navigation = props.navigation;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [userPassword, setUserPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {

          setErrorText('');
          if (!userName) {
            alert(t('fillName'));
            return;
          }
          if (!userEmail) {
            alert(t('fillEmail'));
            return;
          }
        
          if (!userPassword) {
            alert(t('fillPassword'));
            return;
          }
          
          setButtonDisabled(true);
          var dataToSend = {
            username: userEmail.toLowerCase(),
            email: userEmail.toLowerCase(),
            password: userPassword,
            attributes:{
              name: userName
            }
          };
         
          Auth.signUp(dataToSend).then((user)=>{
            console.log("sign up success ", user);  
            props.dispatch(actionSetLoginData(store.getState().userInfo, [dataToSend]));
            props.navigation.replace('ConfirmEmail');
          }).catch ((error)=> {
            setErrorText(error.message);
            console.log('error signing up:', error.message);
            alert(error.message);
            setButtonDisabled(false);
        })
   
    }


  
  return (
<Background>
    <View style={styles.mainBody} >
  
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
   
      <View style={{flex: 1}}>
      <KeyboardAvoidingView enabled style={{flex: 1, justifyContent: "center"}}>
         <View style={styles.imageView}>
            <Image
              source={require('../../Image/gilly_logo.png')}
              style={{
                width: '50%',
                height: "50%",
                resizeMode: 'contain',
         
              }}
            />
          </View>
          <View style={styles.textInputView}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserName) => setUserName(UserName)}
           
            placeholder={t("name")}
            placeholderTextColor={colors.placeholderText}
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() =>
              emailInputRef.current && emailInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          </View>
          <View style={styles.textInputView}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
 
            placeholder={t("email")}
            placeholderTextColor={colors.placeholderText}
            keyboardType="email-address"
            ref={emailInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current &&
              passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          </View>
          <View style={styles.textInputView}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPassword) =>
              setUserPassword(UserPassword)
            }
        
            placeholder={t("password")}
            placeholderTextColor= {colors.placeholderText}
            ref={passwordInputRef}
            returnKeyType="next"
            secureTextEntry={true}
            onSubmitEditing={() =>
              ageInputRef.current &&
              ageInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.buttonsView}>

        <Button
          text = {t("register")}
          onPress={handleSubmitButton}
        />
        </View>
        <View style={styles.linksView}>
        <Pressable disabled={buttonDisabled} onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={styles.registerTextStyle}
            >
              {t("goToLogin")}
            </Text>
            </Pressable>
            <Pressable disabled={buttonDisabled}  onPress={() => navigation.navigate('ConfirmEmail')}>
            <Text style={styles.registerTextStyle}>
              {t("confirmEmail")}
            </Text>
            </Pressable>
            <Pressable disabled={buttonDisabled}  onPress={() => navigation.navigate('ForgotPassword')}>
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
export default connect() (RegisterScreen);

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
 
    
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