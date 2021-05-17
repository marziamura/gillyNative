import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import Button from './Button'
import * as colors from '../Style/Style';
import * as Fonts from "../Style/Fonts"

var {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;

export default function FlatListHorizontal(props)
{
const nullData =  { key: "0",
name: "",
description: props.defaultText
}


const [selectedData, setData] = React.useState(nullData);
const [selectedIndex, setIndex] = React.useState(-1);

const displayData = props.data;


const setCurrentData = (index) => {
    console.log(index);
    setData(displayData[index]);
    setIndex(index);
}

const executeAction = () => {
  props.callback(selectedIndex);
}



const getBGColor = (index) =>   {
  return {backgroundColor: index === selectedIndex 
    ? colors.cardselected
    : colors.cards
  }
}

const getTextColor = () => {
  return {color: -1 === selectedIndex 
    ? colors.textDisabled
    : colors.text
  }

}

const  _renderItem = ({ item, index }) => {
        return (
         <View style={[styles.listElement, getBGColor(index)]} onPress={()=> console.log(index)}> 
          <Pressable onPress={() => setCurrentData(index)} style={[styles.pressable]}>  
          <View>
            <Text style={styles.title}>{item.name}</Text>
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
       
              <Text style ={[styles.textSmall, getTextColor()]}>{selectedData.description}</Text>
           </View>
           <View style ={{flex: 2}}>
            {
              selectedIndex !== -1 && <Button text={props.buttonText} onPress={() => executeAction()}/>
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
        fontSize: Fonts.smallSize,
        marginTop: 0, 
        textAlign: "center",
    },
    carousel:{
        flex: 1,
    },
    description:{
      flex:1,
      flexDirection: "row",
 
      flexWrap: 'wrap',
      marginTop: 5
    },
    textSmall:{
      fontSize: Fonts.smallSize,
      justifyContent: 'center',
    },
    subTitle:{
        fontSize: Fonts.smallSize,
        marginTop: 20
    },
    listElement:{
      flex: 1, 
      backgroundColor: colors.cards,
      width: SCREEN_WIDTH / 2,
      marginHorizontal: 10,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressable:{
      width: SCREEN_WIDTH / 2,
      height: "100%",
      //height:viewHeight,
      marginHorizontal: 10,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    }

  });
  