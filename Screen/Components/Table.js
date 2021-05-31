import React from 'react';
import {View, StyleSheet, SafeAreaView, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import createStore from '../../state/store';

function Row({ column }) {  
    return (
      <View style={styles.rowStyle}>
        {column.map((data) => (
          <Cell data={data} />
        ))}
      </View>
   );
  }

  function Cell({ data }) {
    
    function getCellData(data){
      if (data.type === "text"){
          return <Text>{data.description}</Text>
      }
      if (data.type === "icon" && data.status === 0){
          return <Ionicons name="checkmark-done-circle-outline" color={"green"} size={26}/>
          
      }
      if (data.type === "icon" && data.status === 1){
        return <Ionicons name="caret-forward-circle-outline" color={"blue"} size={26}/>
      }
      if (data.type === "icon" && data.status === 2){
        return <Ionicons name="lock-closed-outline" color={"gray"} size={26}/>
      }
      return data;
    }

    return (
      <View style={styles.cellStyle}>
        {getCellData(data)}
      </View>
    );
  }

  function Header(){
      const data = [<Text/>, 
      <Ionicons name="book-outline" size={26} />,
      <Ionicons name="person-outline" size={26}/>,
      <Ionicons name="people-outline" size={26} />,
      ]

      return <Row column={data}/>
  }

  export default function Table() {
    let store = createStore();
    const data = store.getState().treatsCat;


    return (
      <View style={styles.gridContainer}>
        <Header/>
        {data.map((column) => (
          <Row column={column} id={Math.random()}/>
        ))}
      </View>
    );
  }

  const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
    },
    rowStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    cellStyle: {
      flex: 1,
      margin: 10,
    },
  });