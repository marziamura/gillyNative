import React from 'react';
import Carousel from "./carousel";
import journeyDataDev from '../../HardCodedDataDev/JourneysData';
import journeyDataProd from '../../HardCodedDataProd/JourneysData';
import Constants from 'expo-constants'
export default function ExploreJourneys({navigation}){

//let journeyData = Constants.extra.env === "dev" ? journeyDataDev : journeyDataProd;
const env = Constants.manifest.extra.env
let journeyData = env === "dev"? journeyDataDev : journeyDataProd;

const doAction = (selected) =>{
  console.log(selected)
  navigation.replace("ExploreJourney");
}

//console.log("navigation object", navigation);

return <Carousel data={journeyData} callback={doAction}  buttonText={"select journey"} defaultText={"Select a category above"} />

}


  