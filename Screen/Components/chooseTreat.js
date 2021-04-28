import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import Carousel from "./carousel"
import createStore from '../../state/store';
import actionSetTreatData from '../../state/actionSetTreatData'
import Constants from 'expo-constants'

import treatDataDev from '../../HardCodedDataDev/TreatData'
import treatDataProd from '../../HardCodedDataProd/TreatData'


export default function ChooseTreat(props){
const store = createStore();
const env = Constants.manifest.extra.env

let treatData = env === "dev" ? treatDataDev : treatDataProd;

const showTreat = (selected) =>{
  console.log(selected)
  var currentData={
              id: treatData[selected].typeFormId[0],
              description: treatData[selected].description[0]
  }
  store.dispatch(actionSetTreatData([currentData])); 
  props.navigation.replace("TodaysTreat");
}
 
return <Carousel data={treatData} callback={showTreat} buttonText={"open treat"} defaultText={"Select a category above"}/>

}


  