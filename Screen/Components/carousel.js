import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions  } from 'react-native';
import { IconButton } from 'react-native-paper'
import * as colors from '../Style/Style'

export default function FlatListHorizontal(props)
{
const nullData =  { key: "0",
type: "",
title: "",
description: "",
treat: ""  }

const [selectedData, setData] = React.useState(nullData);

const [selectedIndex, setIndex] = React.useState();

let {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;

const setCurrentData = (index) => {
    setData(displayData[index]);
    setIndex(index);
}

const executeAction = () => {
  props.callback(selectedIndex);
}

const displayData = props.data;

const  _renderItem = ({ item, index }) => {
        return (
            <View
            
            style={{
              padding: 10,
              backgroundColor: colors.cards,
              width: SCREEN_WIDTH / 2,
           //   height: "100%",
              //height:viewHeight,
              marginHorizontal: 10,
              borderRadius: 24
            }}>
            <Pressable onPress={() => setCurrentData(index)}>  
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
           
        
            <View style ={styles.row}>
           
                <View style={{flex: 4}}>
                <Text style ={styles.textSmall}>{selectedData.description}</Text>
                </View>
                <View style={{flex: 1, widht: 20}}>
                <Pressable onPress={() => executeAction()}>  
                {selectedData.description !== "" && <IconButton
                    icon="arrow-right-bold"  
                    size={30}
                    color={colors.icons}
                    onPress={props.onPress}
                    style={styles.arrowIcon}
                  />}
                  </Pressable>
                </View>
                
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
        flex:1
    },
    description:{
      flex:1,
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
    }
  });
  