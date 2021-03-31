// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import actionUserLogin from '../../state/actionUserLogin';
import createStore from '../../state/store';
import {getUserInfo} from '../../state/userInfo';
import * as colors from '../Style/Style';
import Background from '../Components/Background';
import { Button,  TextInput } from 'react-native-paper';


import {
  StyleSheet,
 
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Alert 
} from 'react-native';



const LoginScreen = ({navigation,dispatch}) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
 
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const passwordInputRef = createRef();
  const userInfo = createStore().getState().userInfo[0];

  const handleSubmitPress = () => {
  
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
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

        const user = [{
          id: cognitoUser.username,
          partnerID: cognitoUser.attributes["custom:partnerID"],
          name: cognitoUser.attributes["name"],
          journey: cognitoUser.attributes["custom:journey"]
        }]
   
        dispatch(actionUserLogin(createStore().getState().userInfo,user));

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
          Alert.alert("Error", error.message);
        }

        getUserInfo().then((u)=>{promiseResolve(u)}).catch((u)=>{promiseReject(u)});
        
     }).catch ((error)=> {
    
 
      console.log(error.message);
      Alert.alert("Error", error.message);
      setButtonDisabled(false);
  
   })
 }

  React.useEffect(()=>{
    
    if(userInfo.email !== "xxx" &&  userInfo.password && userInfo.password !== "xxx"){
      console.log("Signing in automatically...");
      setUserEmail(userInfo.email);
 //     userPassword(userInfo.password);
      signIn();
    }

  }, [])
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
   <View>
      <KeyboardAvoidingView enabled >
        
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
                onChangeText={(UserEmail) =>{
                 
                  setButtonDisabled(false);
                  setUserEmail(UserEmail)
                  }
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
            <View style={styles.textInputView}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>{

                  setButtonDisabled(false);
                  setUserPassword(UserPassword)
                  }
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
  
        {   <View style={styles.buttonsView}>
            <Button       
              onPress={handleSubmitPress}
              disabled={buttonDisabled}
              accessibilityLabel="Login"
              mode="outlined" 
              uppercase={false}
              contentStyle={styles.button}
              style={styles.buttonStyle}
            >
            Login
          </Button>
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
            </View>}
           
     
            </KeyboardAvoidingView>

        </View>
      </ScrollView>
    </View>  
    </Background>
  );
};
export default connect() (LoginScreen);

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageView:{
    //flex: 1,
    alignItems: 'center',
    height: 100,
    marginBottom: 10,
  },
  textInputView: {
    alignItems: 'center',
    height: 100,
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
    marginTop: 80,
    
  },

  inputStyle: {
    //flex: 1,
    color: colors.text,
   // height: 100,
    width: 300,
    paddingLeft: 15,
   // paddingRight: 15,
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
    paddingBottom: 15,
    paddingTop: 15,
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
    width: 200,
    height: 50,
    borderRadius: 30,
   },


});