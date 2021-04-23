import React from 'react';
import Carousel from "./carousel"
import createStore from '../../state/store';
import journeyData from '../../HardCodedData/TreatData'

export default function ExploreJourneys({navigation}){


const doAction = (selected) =>{
  console.log(selected)
  navigation.replace("ExploreJourney");
}

console.log("navigation object", navigation);

return <Carousel data={journeyData} callback={doAction}  buttonText={"select journey"} defaultText={"Select a category above"} />

}


  