// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { Auth } from 'aws-amplify';
import actionSetLoginData from '../../state/actionSetLoginData';
import { connect } from 'react-redux';
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
            placeholderTextColor="#8b9cb5"
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
            placeholderTextColor="#8b9cb5"
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
            placeholderTextColor="#8b9cb5"
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
    <View style={{flex: 1, backgroundColor: '#307ecc'}} >
  
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
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});