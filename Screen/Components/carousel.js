import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';

export default function FlatListHorizontal(props)
{
const nullData =  { key: "0",
type: "",
title: "",
description: "",
treat: ""  }

const [selectedData, setData] = React.useState(nullData);

let {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;

const executeAction = (index) => {
    setData(displayData[index])
    props.callback(index);
}

const displayData = props.data;

const  _renderItem = ({ item, index }) => {
        return (
            <View
            
            style={{
              padding: 10,
              backgroundColor: '#C4C4C4',
              width: SCREEN_WIDTH / 2,
              height: "100%",
              //height:viewHeight,
              marginHorizontal: 10,
              borderRadius: 24
            }}>
            <Pressable onPress={() => executeAction(index)}>  
              <Text style={styles.title}>{item.title}</Text>
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
            <Text style ={styles.textSmall}>{selectedData.description}</Text>
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
    description:{
      flex:1,
      alignItems: "center",
      justifyContent: "center"
    },
    textSmall:{
      fontSize: 15,
    },
    subTitle:{
        fontSize: 20,
        marginTop: 20
    }
  });
  