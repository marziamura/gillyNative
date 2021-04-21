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
import Button from '../Components/Button'

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';


const RegisterScreen = (props) => {
  let store = createStore(); 
  let navigation = props.navigation;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrorText] = useState('');

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
          setErrorText('');
          if (!userName) {
            alert('Please fill Name');
            return;
          }
          if (!userEmail) {
            alert('Please fill Email');
            return;
          }
        
          if (!userPassword) {
            alert('Please fill Password');
            return;
          }
 
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
        })
   
    }

  function getView(){
      return  <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        justifyContent: 'center',
        alignContent: 'center',
      }}>
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
      <KeyboardAvoidingView enabled>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserName) => setUserName(UserName)}
           
            placeholder="Enter Name"
            placeholderTextColor={colors.placeholderText}
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() =>
              emailInputRef.current && emailInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
       
            placeholder="Enter Email"
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
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPassword) =>
              setUserPassword(UserPassword)
            }
        
            placeholder="Enter Password"
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
        <View style={styles.centerContent}>

        <Button
          text = "Register"
          onPress={handleSubmitButton}
        />
        </View>
        <View style={styles.buttonsView}>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('LoginScreen')}>
              Already one of us? Login here
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
            </View>
      </KeyboardAvoidingView>
    </ScrollView>
  }
  
  return (
<Background>
    <View style={styles.mainBody} >
  
      {getView()}
     
    </View>
    </Background>
  );
};
export default connect() (RegisterScreen);

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
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
    borderWidth: 1,
    color: colors.white,
    borderColor: colors.border,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: colors.text,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
  //  color: colors.text,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.border,
  },
  errorTextStyle: {
    color: colors.textError,
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  registerTextStyle: {
    color: colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  centerContent:{
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
});