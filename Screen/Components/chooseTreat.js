import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import Carousel from "./carousel"
import createStore from '../../state/store';
import actionSetTreatData from '../../state/actionSetTreatData'
import treatData from '../../HardCodedData/TreatData'

export default function ChooseTreat(props){
const store = createStore();


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


  