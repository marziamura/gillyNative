// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import createStore from '../../state/store';
import {updateUserInfo} from '../../state/getUserInfo'
import * as colors from '../Style/Style'

import {
  View,
  StyleSheet,
  Pressable
} from 'react-native';
import actionSetUserInfo from '../../state/actionSetUserInfo';

/*const user = [{
  id: "xxx",
  partnerID: "zzzz",
  userName: "xxxxx",
  journey: "zzzzz",
  sex: "xxx",
  gender: "xxx",
  partnerID: "xxx",
  email: "xxx",
  password: "xxx",
  primary: true,
  registered: false,
  todaysTreatDone: false,
  lastTreatInJourney: 0
}]
type User  @model @key(fields:["id"]){
  id: ID!,	
  partnerID: ID,	
  userName: String!,	
  primary: Boolean!,	
  registered: Boolean,	
  email: String!,	
  tel: String!,	
  activeDays: Int,
  lastActiveDay: AWSDate,
  journey: String,
  sex: String,
  gender: String,
  preferences: String,
  partnerName: String,
  
}*/

const Welcome = ({navigation}) => {
 
  const [gender, setGender] = useState("woman");
  const [sex, setSex] = useState("vulva");
  const store = createStore();


  return (
    <View style={styles.container}>

       <View style={styles.SectionStyle}>
        <Text style={styles.about}>
        About you
        </Text>
      </View>
      <Text style={styles.textLabel}>
        I am a...
      </Text>
      <Picker
      selectedValue={gender}
      style={styles.dropDown}
      onValueChange={(itemValue, itemIndex) =>
        setGender(itemValue)
      }>
      <Picker.Item label="Woman" value="woman" />
      <Picker.Item label="Men" value="men" />
      <Picker.Item label="More" value="more" />
      <Picker.Item label="Prefer not to say" value="none" />

    </Picker>
    <Text style={styles.textLabel}>
        I have a...
     </Text>
    <Picker
      selectedValue={sex}
      style={styles.dropDown}
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
     
    <Text style={styles.text}>
          Gilly uses factors like gender and sex to help curate content most relevant to you
      </Text>

      <View style={styles.button}>
  
        <Pressable
          onPress={()=>{
                  let userInfo = store.getState().userInfo;
                  userInfo[0].sex = sex;
                  userInfo[0].gender = gender; 
                 
                  updateUserInfo(userInfo[0]).then((u)=>{
                     navigation.replace("HomeNavigationRoutes");
                   }).catch((e)=>{
                     console.log(e);
                     navigation.replace("HomeNavigationRoutes");
                   })
            }}>
          <Text style={styles.buttontext}> 
          Next
          </Text>
        </Pressable> 
    </View>
        
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   // justifyContent: 'center',
    backgroundColor: colors.background,
  },
  text: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 20,
    marginTop: 30
  },
  textLabel: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'normal',
   
    marginBottom: "2%",
    marginTop: 30,
   
  },
  button:{
    backgroundColor: colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 16,
    width: '80%',
    height: 40,
  },
  about:{
   // position: 'fixed',
    //top: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropDown:{
    //marginTop: 20,
    width: '80%',
    height: '5%',
    borderRadius: 10,
  },
  SectionStyle:{
    marginBottom: 20,
  },
  buttontext:{
    fontSize: 21,
    color: colors.buttonText
  },
 

});