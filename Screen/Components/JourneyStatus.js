import React from 'react';
import { useTranslation } from 'react-i18next';
import * as params from '../Style/Params';
import {getSubmissionsInJourney, getFormId} from '../../state/userInfo';
import Button from '../Components/Button';
import createStore from "../../state/store";
import actionSetTreatData from '../../state/actionSetTreatData';
import * as colors from '../Style/Style'
import * as fonts from '../Style/Fonts'


import {
  StyleSheet,
  View 
} from 'react-native';

import Text from "../Components/GillyText";

function JourneyStatus(props) {
    const user = props.user;
    let store = createStore();
    const { t } = useTranslation('Home');
    let [nextTreat, setNextTreat] = React.useState(0);
      
  /*  React.useEffect(()=>{
      console.log("====> Getting updated journey Info: ");
      getJourneyInfo(user).then((user)=>{ 
        console.log("JourneyInfo", user)
        setNextTreat(user.lastTreatInJourney);
      }).catch(error=> console.log(error))
    
    }, [nextTreat])*/

    function formIdCallback(tdata){
      console.log("formId Callback ", tdata);
      var fId = tdata.formId; 
      console.log("getFormId ", fId,  tdata.description);
      let  currentData={
        id: fId,
        description:  tdata.description,
        journey: tdata.journey,
      }
      store.dispatch(actionSetTreatData([currentData])); 
      props.navigation.push("TodaysTreat");
    }
  
    const getTreatInfo = () =>{
      getSubmissionsInJourney(user, user.journeynp).then((user)=>{ 
        console.log("JourneyInfo", user)
        getFormId(user.lastTreatInJourney, user.journey, formIdCallback, (error)=>{alert(error.message)});
        setNextTreat(user.lastTreatInJourney);
      }).catch(error=> console.log(error))
   }
  
    function openNextTreat(){
      getTreatInfo();      
    }

    return (
     <View style={[styles.journeyStatus, styles.centerContent, , styles.viewPlacement]}>
        
            <Text style={styles.inviteText}>
            {t("status", {nb: user.lastTreatInJourney, journey: user.journey})}
            </Text>
            <Button text={t("openNextTreat")} onPress={openNextTreat}/>

    </View>
    )
}

export default JourneyStatus

const styles = StyleSheet.create({
    journeyStatus: {
    
    },
    viewPlacement:{
        alignSelf: "center",
        width: params.viewWidth,
        borderRadius: params.viewBorderRadius,
    },
    
   centerContent:{
    alignItems: "center",
    justifyContent: "center"
  },
  inviteText:{
      // alignSelf: "center",
       color: colors.textEnabled,
       fontSize: fonts.smallSize,
       justifyContent: "center",
       
  }
})