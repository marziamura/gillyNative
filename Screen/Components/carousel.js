import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import Button from './Button'
import * as colors from '../Style/Style'

var {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;

export default function FlatListHorizontal(props)
{
const nullData =  { key: "0",
type: "",
title: "",
description: "",
treat: ""  }

const [selectedData, setData] = React.useState(nullData);

const [selectedIndex, setIndex] = React.useState();



const setCurrentData = (index) => {
    console.log(index);
    setData(displayData[index]);
    setIndex(index);
}

const executeAction = () => {
  props.callback(selectedIndex);
}

const displayData = props.data;
const getBGColor = (index) =>   {
  console.log("background color", index, selectedIndex)
  return {backgroundColor: index === selectedIndex 
    ? colors.cardselected
    : colors.cards
  }
}
const  _renderItem = ({ item, index }) => {
        return (
         <View style={[styles.listElement, getBGColor(index)]} onPress={()=> console.log(index)}> 
          <Pressable onPress={() => setCurrentData(index) }>  
            <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          </Pressable>
        </View>
        );
      };

return  <View style={styles.container}>
          <View style ={styles.carousel}>
            <FlatList horizontal
              data={displayData}
              renderItem={_renderItem}
              pagingEnabled={true}
            // keyExtractor={(item)=>{item.title}}
              style={{width: "100%"}}
              //ItemSeparatorComponent={() => <View style={{margin: 4,  backgroundColor: 'red'}}/>}
            />
          </View>
          <View style ={styles.description}>
           <View style={{flex: 4}}>
       
              <Text style ={styles.textSmall}>{selectedData.description}</Text>
           </View>
           <View style ={{flex: 2}}>
            {
              selectedData.description !== "" && <Button text={"open treat"} onPress={() => executeAction()}/>
            }
            </View>
          </View>
</View>

}



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      width: "100%"
    },

    title:{
        fontSize: 20,
        marginTop: 0
    },
    carousel:{
        flex: 1,
    },
    description:{
      flex:1,
      flexDirection: "row",
   //   textAlign: 'center',
      flexWrap: 'wrap'
    },
    textSmall:{
      fontSize: 20,
    },
    subTitle:{
        fontSize: 20,
        marginTop: 20
    },
    row:{
      flex: 1,
      flexDirection: "row",
      marginTop: 5
    },
    listElement:{
      flex: 1, 
      backgroundColor: colors.cards,
      width: SCREEN_WIDTH / 2,
      //height: "100%",
      //height:viewHeight,
      marginHorizontal: 10,
      borderRadius: 24,
    },

  });
  