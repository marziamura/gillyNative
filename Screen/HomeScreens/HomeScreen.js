// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import Button from '../Components/Button';
import Background from '../Components/Background'
import createStore from '../../state/store';
import { updateUserInfo } from '../../state/getUserInfo';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as colors from '../Style/Style';
import actionSetTreatData from "../../state/actionSetTreatData"

console.log("loading HomeScreen");



const HomeScreen = ({navigation}) => {
  let store = createStore();
  const [buttonEnabled, setButtonEnabled] = React.useState(false);
  const [treatDescription, setTreatDescription] = React.useState("");
  const user = store.getState().userInfo[0];


  console.log("******** HomeScreen ******** ", store.getState().userInfo);
  function press(){
    console.log("OnPress");
    navigation.replace("TodaysTreat")
  };

  const button = {
    color:"#841584", 
    fontSize: 20,
  };
  const pressable ={
    width : '80%',
  }
  
  React.useEffect(()=>{
    updateUserInfo().then(() => console.log("updated pushNotifciation Token"))
    .catch(error=> console.log(error))
  }, [])
  
  function getFormId(){

    console.log("Getting formId", user.lastTreatInJourney);  
    if(!user || !user.journey)
      return;
    
    API.graphql(graphqlOperation(queries.getFormId,{
      day: user.lastTreatInJourney + 1,
      journey: user.journey,
     })).then((data)=>{
      console.log("getFormId ", data);
      var fId = data.data.getFormId.formId; 
      console.log("getFormId ", fId);
      var treatData={
        id: fId,
        description: data.data.getFormId.description
      }
      store.dispatch(actionSetTreatData([treatData])); 
      setButtonEnabled(true);
      setTreatDescription(treatData.description || "Ready for your next treat?");
   
     }).catch((error)=>{
       console.log("formId error retrieving form information ", error, user.lastTreatInJourney + 1, user.journey);
      // setFormId(null);
    });
  }

  React.useEffect(getFormId,[]);


  return (
  <Background>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.containerView}>
       <View style={styles.textView}>
            <Text>{treatDescription}</Text>
        </View> 
        <View style={styles.buttonView}>
          <Button       
              press={press}
              title="Daily Treat"
              disabled={buttonEnabled}
              styletext={button}
              styleover={pressable}
              accessibilityLabel="Open your daily Treat"
            />
        </View> 
    </View>
    </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  
  textView:{
       width: '100%',
       height: "60%",
       justifyContent: 'center',
       alignItems: 'center',
       color: colors.text,
  },
  buttonView:{
    width: '100%',
    height: "40%",
    justifyContent: 'center',
    alignItems: 'center',
},
  containerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: colors.background,
  },

})

export default HomeScreen;

