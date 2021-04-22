import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import Carousel from "./carousel"
import createStore from '../../state/store';
import actionSetTreatData from '../../state/actionSetTreatData'

export default function ChooseTreat(props){
const store = createStore();

const treatData =[
    { key: "1",
      type: "Sexploration",
      title: "Connect emotionally",
      description: "Talking Sex",
      typeFormId: "KDSdf27y"  },
    { key: "2",
      type: "Grooving",
      title: "Feel touch",
      description: "Do brains and genitals always agree?",
      typeFormId: "KQ77DZzj" },
    { key: "3",
      type: "Lockdown",
      title: "Express Love",
      description: "Movie Night",
      typeFormId: "JYuEQ4sT"},
    { key: "4",
      type: "Discovery",
      title: "Do Nothing",
      description: "I love your love language",
      typeFormId: "ckk1eLhI"}
]

const showTreat = (selected) =>{
  console.log(selected)
  var currentData={
              id: treatData[selected].typeFormId,
              description: treatData[selected].description
  }
  store.dispatch(actionSetTreatData([currentData])); 
  props.navigation.replace("TodaysTreat");
}

return <Carousel data={treatData} callback={showTreat}/>

}


  