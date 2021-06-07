import React from 'react';
import {View, StyleSheet, SafeAreaView, Pressable, Text} from 'react-native';
import createStore from '../../state/store';
import { Avatar } from 'react-native-elements';
import * as colors from '../Style/Style';
import actionSetTreatData from '../../state/actionSetTreatData';
import { TouchableOpacity, TouchableHighlight} from 'react-native';
import InfoDialog from './InfoDialog'



export default function Table(props) {
    let [invitePartner, setInvitePartner] = React.useState(false);
    const store = createStore();
    const userInfo = store.getState().userInfo[0];
    const coupleId = userInfo.coupleId;
    const isSolo = !(coupleId && userInfo.partnerID);
    console.log("User Info ", userInfo, isSolo)
   
    function getCellData(data){
      console.log("Cell Data ", data)
      if(data.type === "text"){
          return <React.Fragment/>
      }
      if (data.type === "learn" ){
        return <View>
              <TouchableOpacity  onPress={() => { openTreat(data)}}>
                <TreatButton icon='book-outline' status={data.status}  description={"Learn"}/>
                    <Text>min.: {data.min}</Text>
                   </TouchableOpacity>
                </View>
          
      }
      if (data.type === "solo"){
        return <View>
     <TouchableOpacity  onPress={() => { openTreat(data)}}>
                    <TreatButton icon="person-outline" status={data.status}  description={"Solo"}/>
                    <Text>min.: {data.min}</Text>
                    </TouchableOpacity>
                </View>
      }
      if (data.type === "couple"){
        return  <View>
                     <TouchableOpacity  onPress={() => { openTreat(data)}}>
                      <TreatButton icon="people-outline" status={data.status} description={"Partner"}/>
                      <Text>{data.min} min</Text>
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
        let i = 0;
        return (
          <View style={styles.card} id={Math.floor(Math.random())}>
            <Text>{column[0].description}</Text>
            <View style={styles.rowStyle} >
            {column.slice(1).map((data) => {
                    
                    return <Cell data={data} key={ids[i++]}/>
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
        size="medium"
        rounded
        icon={{name: tData.icon, color: colors.gillyGreen, type: 'ionicon'}}
        overlayContainerStyle={{backgroundColor: colors.violet}}
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
    
    function closeInvitePartnerDialog(){
      setInvitePartner(false);
    }

    function openTreat(tdata){
        console.log(" open treat ", isSolo, tdata)
        if(isSolo && tdata.status === 4){
          setInvitePartner(true);
          return;
        }

        console.log("formId Callback ", tdata);
        var fId = tdata.id; 
      
        let  currentData={
          id: fId,
          description:  tdata.description,
          journey: tdata.journey,
        }
        console.log("Setting treat data ", tdata, currentData);
        store.dispatch(actionSetTreatData([currentData])); 
        props.navigation.push("TodaysTreat");  
      
    }

    console.log("Rendering table ", props)
    const data = props.data || [];
    const ids=["a","b","c",4,5,6];
    let i = 0;
    return (
      <View style={styles.gridContainer}>
        {data.map((column) => (
          <Row column={column} key={ids[i++]}/>
        ))}
        {invitePartner && <InfoDialog callback={closeInvitePartnerDialog}>
        <View style={[styles.centerContent]}>
                <TouchableHighlight 
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={()=>{props.navigation.push("InvitePartner")}}>
                  <Text style={styles.inviteText}>
                    invite your partner
                  </Text>
                </TouchableHighlight>
              </View>
                          </InfoDialog>}
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