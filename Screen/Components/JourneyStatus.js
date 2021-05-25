import React from 'react';
import { useTranslation } from 'react-i18next';
import * as params from '../Style/Params'
import {getJourneyInfo, } from '../../state/getUserInfo'
import Button from '../Components/Button'


import {
  StyleSheet,
  View ,
  Text
} from 'react-native';

function JourneyStatus(props) {
    const user = props.user;
    const { t } = useTranslation('Home');
    let [nextTreat, setNextTreat] = React.useState(0);
      
    React.useEffect(()=>{
    
      getJourneyInfo(user).then((user)=>{ 
        console.log("JourneyInfo", user)
        setNextTreat(user.lastTreatInJourney);
      }).catch(error=> console.log(error))
    
    }, [nextTreat])

    function openNextTreat(){

    }

    return (
     <View style={[styles.journeyStatus, styles.centerContent, , styles.viewPlacement]}>
        
            <Text style={styles.inviteText}>
            {t("status", {nb: 0, journey: user.journey})}
            </Text>
            <Button text={t("openNextTreat")} />

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

  }
})