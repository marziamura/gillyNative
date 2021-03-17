// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import actionUserLogin from '../../state/actionUserLogin';
import createStore from '../../state/store';
import {getUserInfo} from '../../state/getUserInfo';
import * as colors from '../Style/Style';


import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';



const LoginScreen = ({navigation,dispatch}) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();
  const userInfo = createStore().getState().userInfo[0];

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    signIn()
  
 };
 
 async function signIn() {
      let dataToSend = {username: userEmail, password: userPassword};
      console.log( "signing in ",dataToSend);
 
      Auth.signIn(dataToSend).then((cognitoUser)=>{
        console.log(cognitoUser);

        const user = [{
          id: cognitoUser.username,
          partnerID: cognitoUser.attributes["custom:partnerID"],
          name: cognitoUser.attributes["name"],
          journey: cognitoUser.attributes["custom:journey"]
        }]
   
        dispatch(actionUserLogin(createStore().getState().userInfo,user));

        let promiseResolve = (user)=>{
    
          if (!user || !user.sex){
           
            console.log("got user info ", user);
            navigation.replace('OnboardingNavigationRoutes');
          }else{
    
            console.log("got user info ", user);
            navigation.replace('HomeNavigationRoutes');
          }
        }
        let promiseReject = (error)=>{
     
          console.log("error", error);
          setErrortext("Error " + error);
        }
        alert('2');
        getUserInfo().then((u)=>{promiseResolve(u)}).catch((u)=>{promiseReject(u)});
        
     }).catch ((error)=> {
    
     // Auth.currentAuthenticatedUser().then((cognitoUser)=>{
      console.log(error.message);
      setErrortext(error.message);
  //    navigation.replace('HomeNavigationRoutes');
     //  alert(String(error));
     /* if(error.message.includes('s.default')){
        navigation.replace('HomeNavigationRoutes');
       }else{
        setErrortext(error.message);
       }*/
    
   })
 }

  React.useEffect(()=>{
    
    if(userInfo.email !== "xxx" && userInfo.password !== "xxx"){
      console.log("Signing in automatically...");
      setUserEmail = userInfo.email;
      userPassword = userInfo.password;
      signIn();
    }

  }, [])
  return (
    <ImageBackground source={require('../../assets/background_gradient.png')} style={styles.backgroundImage}>
    <View style={styles.mainBody}>
     
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../Image/gilly_logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor= {colors.placeholderText}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid={colors.underlineColor}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor={colors.placeholderText}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid={colors.underlineColor}
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here? Register
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('ConfirmEmail')}>
              Confirm Email
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot Password
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
    </ImageBackground>
  );
};
export default connect() (LoginScreen);

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: colors.buttonBackground,
    borderWidth: 0,
    color: colors.white,
    borderColor: colors.border,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: colors.text,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: colors.text,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.border,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  registerTextStyle: {
    color: colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: colors.textError,
    textAlign: 'center',
    fontSize: 14,
  },
});