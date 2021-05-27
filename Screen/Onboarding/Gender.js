
import React, {useState} from 'react';
import {Text} from 'react-native';

import createStore from '../../state/store';
import {saveUserInfo, updateUserInfo} from '../../state/userInfo'
import  Button  from '../Components/Button'
import Background from '../Components/Background'
import Dropdown from '../Components/dropdown'

import {
  View,
  StyleSheet,
} from 'react-native';

const Gender = ({navigation}) => {
 
  const [gender, setGender] = useState("xxx");
  const [sex, setSex] = useState("xxx");
  const store = createStore();

  const genderItems =[{
    value: "Woman",
    title: "Woman"
  },
  {
    value: "man",
    title: "Man"
  },
  {
    value: "more",
    title: "More"
  },
  {
    value: "none",
    title: "Prefer not to say"
  },
 ]

 const sexItems =[{
  value: "vulva",
  title: "Vulva"
},
{
  value: "penis",
  title: "Penis"
},
{
  value: "more",
  title: "More"
},
{
  value: "none",
  title: "Prefer not to say"
},
]
  var saveInfo = () =>{
    let userInfo = store.getState().userInfo[0];
    console.log("Updated userInfo", userInfo);
    userInfo.sex = sex;
    userInfo.gender = gender; 
    console.log("Navigate to FirstTreatNavigationRoutes 0", userInfo);
    if(userInfo.sex !== "" && userInfo.gender != ""){
   //   navigation.replace("RelationshipQuestion");
    
      saveUserInfo(userInfo).then((u)=>{
        console.log("Navigate to FirstTreatNavigationRoutes 1", userInfo);
        navigation.replace("RelationshipQuestion");
      }).catch((e)=>{
        console.log("Error saving userInfo ", e);
        updateUserInfo(userInfo).then(()=>
          navigation.replace("RelationshipQuestion"))
        .catch(()=>{
          console.log("Error updating userInfo ", e)
          navigation.replace("RelationshipQuestion")
      })
      })
    }else{
     alert("Please select one option for gender and sex")
    }
  }

  return (
    <Background>
    <View style={styles.container}>

       <View style={styles.SectionStyle}>
        <Text style={styles.about}>
        About you
        </Text>
      </View>
  
   <Dropdown title="I am a..." items={genderItems} callback={setGender}/>
   <Dropdown title="I have a..." items={sexItems} callback={setSex}/>
  
     
    <Text style={styles.text}>
          Gilly uses factors like gender and sex to help curate content most relevant to you
    </Text>

      <View style={styles.buttonView}>
         <Button       
              onPress={saveInfo}
               text = "Next"
          />
          
     
    </View>
        
    </View>
    </Background>
  );
};

export default Gender;

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
 
  buttonStyle:{
    justifyContent: 'center',
    width: '100%',
    height: "40%",
    borderRadius: 30,
   },

  about:{
    position: 'relative',
    
    top: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropDown:{
    //marginTop: 20,
    width: '80%',
    height: '5%',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#99B1FB"
  },
  SectionStyle:{
    marginBottom: 20,
  },
  buttonView:{
    width: '60%',
    height: "20%",
    justifyContent: 'center',
    alignItems: 'center',
 },
 

});
