// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import createStore from '../../state/store';
import {saveUserInfo} from '../../state/userInfo'
import * as colors from '../Style/Style'

import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground
} from 'react-native';


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

const Children = ({navigation}) => {
 
  const [gender, setGender] = useState("woman");
  const [sex, setSex] = useState("vulva");
  const store = createStore();


  return (
    <ImageBackground source={require('../../assets/background_gradient.png')} style={styles.backgroundImage}>
    <View style={styles.container}>

       <View style={styles.SectionStyle}>
        <Text style={styles.about}>
        About you
        </Text>
      </View>

    <Text style={styles.textLabel}>
        I have...
     </Text>
    <Picker
      selectedValue={sex}
      style={styles.dropDown}
      onValueChange={(itemValue, itemIndex) =>{
        console.log("setting children", itemValue);
        setSex(itemValue);
      }
      }>
      <Picker.Item label="no children" value="0" />
      <Picker.Item label="children younger than 2" value="1" />
      <Picker.Item label="children younger than 5" value="2" />
      <Picker.Item label="children younger than 10" value="3" />
      <Picker.Item label="children older than 10" value="3" />
    </Picker>
     
    <Text style={styles.text}>
          Gilly uses factors like gender and sex to help curate content most relevant to you
    </Text>

      <View style={styles.button}>
  
        <Pressable
          onPress={()=>{
                  let userInfo = store.getState().userInfo[0];
                  console.log("Updated userInfo", userInfo);
                  userInfo.sex = sex;
                  userInfo.gender = gender; 
                  
                  saveUserInfo(userInfo).then((u)=>{
                     console.log("Navigate to FirstTreatNavigationRoutes", userInfo);
                     navigation.replace("FirstTreatNavigationRoutes");
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
    </ImageBackground>
  );
};

export default Children;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
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
    borderWidth: 1
  },
  SectionStyle:{
    marginBottom: 20,
  },
  buttontext:{
    fontSize: 21,
    color: colors.buttonText
  },
 

});

