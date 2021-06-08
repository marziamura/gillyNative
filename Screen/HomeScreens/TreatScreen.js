
// Import React and Component
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import  WebViewScreen  from '../Components/WebViewScreen';
import createStore from '../../state/store';
import * as fonts from '../Style/Fonts'
import * as colors from '../Style/Style'
import { useTranslation } from 'react-i18next'; 
import * as mutations from '../../graphql/mutations';
import Background from '../Components/Background';
import Button from '../Components/Button';
import * as statusCodes from '../Components/statusCodes'
import {
  View,
  StyleSheet
} from 'react-native';
import actionUpdateTreatStatus from '../../state/actionUpdateTreatStatus';
import Text from "../Components/GillyText"
import * as treatsCategories from '../Components/treatsCategories'

console.log("loading TreatScreen");


const TreatScreen = ({navigation}) => {
    const { t } = useTranslation('treat');
    let store = createStore(); 
    const treatData = store.getState().currentTreat[0];   
    const user = store.getState().userInfo[0]; 
    console.log("Treat Screen with treatData", treatData);
    var source = "https://getgilly.typeform.com/to/";
    var params = '&userid=' + user.id 
                + '&firstname=' + user.userName
                + '&puserid=' + user.partnerID
                + '&partner=' + user.partnerName
                + "&journey=" + treatData.category;
    const typeformLink = source + treatData.id + "#" + params;// + "&" + previousAnswers;
 

  React.useEffect(()=>{     
      console.log("Updating treat data... ", user)
      const toBeSavedData = {
        userId: user.id,
        formId: treatData.id,
        status: statusCodes.STARTED,
      }
      API.graphql(graphqlOperation(mutations.createTreatStatus,{input: toBeSavedData})).then((data)=>{
        console.log("Data was saved ", data);
        toBeSavedData.category = treatData.category;
        console.log("Saving Locally ", toBeSavedData);
        store.dispatch(actionUpdateTreatStatus(null, toBeSavedData));
        return (true)
      }).catch( error =>{
        console.log(error);
        return false;
      })
  },[treatData])

  return  <Background>
    <View style={styles.container}>
          <View style={styles.titleview}>
                <Text style={styles.title}>
                  {treatData.description} 
                </Text>
                <Button  
                  pressableStyle={styles.button}     
                  onPress={()=>{navigation.push("HomeScreen")}}
                  text={t("button")}
                />
          </View>
          <View style={{flex: 6}}>
              <WebViewScreen url={typeformLink} navigation={navigation} afterSubmission={"TreatDone"}/>
          </View>
    </View>
  </Background>
     
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  titleview:{
    flex:1,
    width: "100%",
    justifyContent: "center", 
    alignItems: "center",
  },
  title: {
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "800",
    fontSize: fonts.normalSize,
   
    color: colors.text,
    justifyContent: "flex-start",
  },
  button:{
    width: "20%",
    alignSelf: "center"
  }
 
});
export default TreatScreen;