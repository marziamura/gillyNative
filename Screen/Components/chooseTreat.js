import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import Carousel from "./carousel"

export default function ChooseTreat(){

const treatData =[
    { key: "1",
      type: "Sexploration",
      title: "Sexploration",
      description: "Talking Sex",
      treat: "KDSdf27y"  },
    { key: "2",
      type: "Grooving",
      title: "Grooving",
      description: "Do brains and genitals always agree?",
      treat: "KQ77DZzj" },
    { key: "3",
      type: "Lockdown",
      title: "In lockdown",
      description: "Movie Night",
      treat: "JYuEQ4sT"},
    { key: "4",
      type: "Discovery",
      title: "Discovery",
      description: "I love your love language",
      treat: "ckk1eLhI" },
    { key: "5",
      type: "Flavoured",
      title: "Vanilla?",
      description: "Play that funcy music, partner!",
      treat: "ynPFZe14" }

]

const showTreat = (selected) =>{
  alert(selected);
}

return <Carousel data={treatData} callback={showTreat}/>

}


  