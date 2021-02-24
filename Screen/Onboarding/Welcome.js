// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import createStore from '../../state/store';
import actionSetUserInfo from '../../state/actionSetUserInfo'
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

import {
  View,
  StyleSheet,
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

const Welcome = ({navigation}) => {
 
  const [gender, setGender] = useState("woman");
  const [sex, setSex] = useState("vulva");
  const store = createStore();
  function updateUserInfo(){
   let currentInfo = store.getState().userInfo[0];
   delete currentInfo.todaysTreatDone;
   delete currentInfo.lastTreatInJourney;
   delete currentInfo.todaysTreatDone;
   delete currentInfo.password;
   currentInfo.sex = sex;
   currentInfo.gender = gender;
   store.dispatch(actionSetUserInfo(store.getState().userInfo[0], [currentInfo]));
  
   API.graphql(graphqlOperation(mutations.updateUser, {input: currentInfo}))
    .then((u)=>{
      navigation.replace("FirstTreatNavigationRoutes");
    }).catch((e)=>{
      console.log(e);
      navigation.replace("FirstTreatNavigationRoutes");
    })
  }

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
      <View style={styles.dropDownView}>
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
    </View >
    <Text style={styles.textLabel}>
        I have a...
    </Text>
    <View style={styles.dropDownView}>
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
    </View>
      <Text style={styles.text}>
          Gilly uses factors like gender and sex to help curate content most relevant to you
      </Text>
      <Button
        onPress={()=>{
           updateUserInfo();
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
  text: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'center',
    marginBottom: 20
  },
  textLabel: {
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 50,
  },

  about:{
   // position: 'fixed',
    //top: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropDownView:{
    borderRadius: 10,
    borderWidth: 1,
    width: '80%',
    height: '10%',
  },
  dropDown:{
    //marginTop: 20,
    width: '100%',
    height: '100%',
  
  },
  SectionStyle:{
    marginBottom: 20,
  }
 

});