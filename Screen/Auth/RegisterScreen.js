// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { Auth } from 'aws-amplify';
import actionSetLoginData from '../../state/actionSetLoginData';
import { connect } from 'react-redux';
import * as colors from '../Style/Style'

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


const RegisterScreen = (props) => {
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
            username: userEmail,
            email: userEmail,
            password: userPassword,
            attributes:{
              name: userName
            }
          };
        
          Auth.signUp(dataToSend).then((user)=>{
            console.log("sign up success ", user);  
            props.dispatch(actionSetLoginData(null, [dataToSend]));
            props.navigation.replace('ConfirmEmail');
          }).catch ((error)=> {
            setErrorText(error.message);
            console.log('error signing up:', error.message);
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
            underlineColorAndroid="#f000"
            placeholder="Enter Name"
            placeholderTextColor={colors.placeholder}
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
            underlineColorAndroid="#f000"
            placeholder="Enter Email"
            placeholderTextColor={colors.placeholder}
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
            underlineColorAndroid="#f000"
            placeholder="Enter Password"
            placeholderTextColor= {colors.placeholder}
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
        {errortext != '' ? (
          <Text style={styles.errorTextStyle}>
            {errortext}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitButton}>
          <Text style={styles.buttonTextStyle}>REGISTER</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  }
  
  return (
    <View style={{flex: 1, backgroundColor: colors.background}} >
  
      {getView()}
     
    </View>
  );
};
export default connect() (RegisterScreen);

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
});