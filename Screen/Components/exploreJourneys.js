import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import Carousel from "./carousel"
import createStore from '../../state/store';
import actionSetTreatData from '../../state/actionSetTreatData'

export default function ChooseTreat(props){
const store = createStore();
const treatData =[
    { key: "1",
      type: "Sandy feelings",
      title: "Feel a bit of softness",
      description: "A walk on the sand",
      treat: "KDSdf27y"  },
    { key: "2",
      type: "A short walk",
      title: "Just around the corner",
      description: "Let's go to the lake",
      treat: "KQ77DZzj" },
    { key: "3",
      type: "Lockdown",
      title: "In lockdown",
      description: "You better stay home",
      treat: "JYuEQ4sT"},
    { key: "4",
      type: "Herbalist",
      title: "Discover the fields",
      description: "a journey through flowery meadows",
      treat: "ckk1eLhI" },
    { key: "5",
      type: "Flavoured",
      title: "House paths",
      description: "Just around the house",
      treat: "ynPFZe14" }

]

const doAction = (selected) =>{
  console.log(selected)
  props.navigation.replace("ExploreJourney");
}

return <Carousel data={treatData} callback={doAction}/>

}


  