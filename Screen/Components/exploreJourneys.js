import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';

export default function FlatListHorizontal()
{
const nullTreat =  { key: "0",
type: "",
title: "",
description: "",
treat: ""  }

const [selectedTreat, setTreat] = React.useState(nullTreat);

let {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;

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
      description: "Play that funky music, partner!",
      treat: "ynPFZe14" }

]

const showTreatDescription = (index) => {
  console.log("pressed pressable with index ", index);
  setTreat(treatData[index]);
}

const  _renderItem = ({ item, index }) => {
        return (
            <View
            
            style={{
              padding: 16,
              backgroundColor: '#C4C4C4',
              width: SCREEN_WIDTH / 2,
              height: "100%",
              //height:viewHeight,
              marginHorizontal: 10,
              borderRadius: 24
            }}>
            <Pressable onPress={() => showTreatDescription(index)}>  
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
          </View>
        );
      };

return  <View style={styles.container}>
          <View style ={styles.carousel}>
            <FlatList horizontal
              data={treatData}
              renderItem={_renderItem}
              pagingEnabled={true}
            // keyExtractor={(item)=>{item.title}}
              style={{width: "100%"}}
              //ItemSeparatorComponent={() => <View style={{margin: 4,  backgroundColor: 'red'}}/>}
            />
          </View>
          <View style ={styles.carousel}>
            <Text>{selectedTreat.description}</Text>
          </View>  
</View>

}



const styles = StyleSheet.create({
    container: {
     // backgroundColor: 'gray',
      flex: 1, 
      top: 10,
      width: "100%"
    },
    title:{
        fontSize: 20,
        marginTop: 0
    },
    carousel:{
        flex:2
    },
    descrption:{
      flex:1
     },
    subTitle:{
        fontSize: 20,
        marginTop: 20
    }
  });
  