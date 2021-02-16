// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import createStore from '../../state/store';
import actionSetUserInfo from '../../state/actionSetUserInfo'


import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';



const Welcome = ({navigation}) => {
 
  const [gender, setGender] = useState("woman");
  const [sex, setSex] = useState("vulva");
  const store = createStore();
  function updateUserInfo(){
   let currentInfo = store.getState().userInfo[0];
   currentInfo.sex = sex;
   currentInfo.gender = gender;
   store.dispatch(actionSetUserInfo(store.getState().userInfo[0], [currentInfo]));
  }

  return (
    <View style={styles.container}>

       <View style={styles.SectionStyle}>
        <Text style={styles.about}>
        About you
        </Text>
      </View>
      <Picker
      selectedValue={gender}
      style={{height: 50, width: 100}}
      onValueChange={(itemValue, itemIndex) =>
        setGender(itemValue)
      }>
      <Picker.Item label="Woman" value="woman" />
      <Picker.Item label="Men" value="men" />
      <Picker.Item label="More" value="more" />
      <Picker.Item label="Prefer not to say" value="none" />

    </Picker>
    <Picker
      selectedValue={sex}
      style={{height: 50, width: 100}}
      onValueChange={(itemValue, itemIndex) =>{
        console.log("setting sex value", itemValue);
        setSex(itemValue);
      }
      }>
      <Picker.Item label="Vulva" value="vulva" />
      <Picker.Item label="Penis" value="penis" />
      <Picker.Item label="More" value="more" />
      <Picker.Item label="Prefer not to say" value="none" />
    </Picker>
      <Text>
          Gilly uses factors like gender and sex to help curate content most relevant to you
      </Text>
      <Button
        onPress={()=>{
           updateUserInfo();
           navigation.replace("Onboarding1")
          }}
        title="Next"
        color="#841584"
        accessibilityLabel="Next"
      />
        
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   // justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  about:{
   // position: 'fixed',
    //top: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  image:{

  }
 

});