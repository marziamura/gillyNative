import React from 'react';
import {View, StyleSheet, SafeAreaView, Pressable, Text} from 'react-native';
import createStore from '../../state/store';
import { Avatar } from 'react-native-elements';
import * as colors from '../Style/Style';
import actionSetTreatData from '../../state/actionSetTreatData';
import { TouchableOpacity } from 'react-native';


export default function Table(props) {
  
    function getCellData(data){
      console.log(data)
      if(data.type === "text"){
          return <React.Fragment/>
      }
      if (data.type === "learn" ){
        return <View>
              <TouchableOpacity  onPress={() => { openTreat(data)}}>
                <TreatButton icon='book-outline' status={data.status}  description={"Learn"}/>
                    <Text>min.: {data.time}</Text>
                   </TouchableOpacity>
                </View>
          
      }
      if (data.type === "solo"){
        return <View>
           <TouchableOpacity  onPress={() => { openTreat(data)}}>
                    <TreatButton icon="person-outline" status={data.status}  description={"Solo"}/>
                    <Text>min.: {data.time}</Text>
                    </TouchableOpacity>
                </View>
      }
      if (data.type === "couple"){
        return  <View>
                      <TouchableOpacity  onPress={() => { openTreat(data)}}>
                      <TreatButton icon="people-outline" status={data.status} description={"Partner"}/>
                      <Text> {data.time} min</Text>
                      <Text>{data.clothes === 0 ? "clothes on" : "clothes off"}</Text>
                      </TouchableOpacity>
                </View>
      }
      return data;
    }

    function Cell({ data }) {        
      return (
        <View style={styles.cellStyle}>
          {getCellData(data)}
        </View>
      );
    }

    function Row({ column }) {  
        console.log("data", column)
        const ids=["a","b","c",4,5,6];
        
        return (
          <View style={styles.card} id={Math.floor(Math.random())}>
            <Text>{column[0].description}</Text>
            <View style={styles.rowStyle} id={Math.floor(Math.random())}>
            {column.slice(1).map((data) => {
                    
                    return <Cell data={data} key={Math.floor(Math.random())}/>
            })}
            </View>
          </View>
      );
      }

      function TreatButton(tData){
        let icon = ""
        let colorI = ""
        if (tData.status === 1){
          icon = "checkmark-outline";
          colorI = "red";
        }
        if (tData.status === 2 ){
          icon = "checkmark-done-outline";
          colorI = "green";
        }
        if (tData.status === 4 ){
          icon = "lock-closed-outline";
          colorI = "gray";
        }

        return <Avatar
        size="small"
        rounded
        icon={{name: tData.icon, color: 'orange', type: 'ionicon'}}
        overlayContainerStyle={{backgroundColor: colors.violet}}
        onPress={() => { openTreat(tData)}}
        activeOpacity={0.7}
        >
          <Avatar.Accessory
            name={icon}
            rounded
            type="ionicon"
            color={colorI}
            backgroundColor="white"
            size={16}
          />
        </Avatar>
      }
    

    function openTreat(tdata){
        console.log("formId Callback ", tdata);
        alert("Open Treat");
        const store = createStore();
        var fId = tdata.id; 
        console.log("getFormId ", fId,  tdata.description);
        let  currentData={
          id: fId,
          description:  tdata.description,
          journey: tdata.journey,
        }
        
        store.dispatch(actionSetTreatData([currentData])); 
        props.navigation.push("TodaysTreat");  
      
    }

    console.log("Rendering table ", props)
    const data = props.data || [];
    
    return (
      <View style={styles.gridContainer}>
    
        {data.map((column) => (
          <Row column={column} key={Math.floor(Math.random())}/>
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
     // justifyContent: "space-around"
    },
    card:{  
      alignItems: "center",
      justifyContent: "center",    
      borderRadius: 10,
      borderWidth: 1,
      margin: 3
    },
    cellStyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",  
    },
  });