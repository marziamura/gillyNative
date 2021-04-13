import React from 'react';
import { View, StyleSheet, FlatList, Text,ScrollView, Dimensions  } from 'react-native';

export default function FlatListHorizontal()
{
let {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;

const journeyData =[
    { key: "1",
      title: "Sexploration foundation",
      treats: 12 },
    { key: "2",
      title: "Grooving in sync",
      treats: 15 },
    { key: "3",
      title: "Love in Lockdown",
      treats: 10  },
    { key: "4",
      title: "Discovery",
      treats: 16 },
    { key: "5",
      title: "Who said vanilla?",
      treats: 18 }

]
const  _renderItem = ({ item, index }) => {
        return (
            <View
            
            style={{
          
              padding: 16,
              backgroundColor: '#C4C4C4',
              width: SCREEN_WIDTH / 2,
              //height:viewHeight,
              marginHorizontal: 10,
              borderRadius: 24
            }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.treats +  " treats"}</Text>
          </View>
        );
      };

return     <View style={styles.container}>

  <FlatList horizontal
    data={journeyData}
    renderItem={_renderItem}
    pagingEnabled={true}
   // keyExtractor={(item)=>{item.title}}
    style={{width: "100%"}}
    //ItemSeparatorComponent={() => <View style={{margin: 4,  backgroundColor: 'red'}}/>}
  />

</View>

}



const styles = StyleSheet.create({
    container: {
     // backgroundColor: 'gray',
      flex: 1, 
      top:10,
      width: "100%"
    },
    title:{
        fontSize: 30,
        marginTop: 10
    },
    subTitle:{
        fontSize: 20,
        marginTop: 20
    }
  });
  