import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { View, StyleSheet, FlatList, Pressable, Dimensions, ActivityIndicator
  , TouchableHighlight, Platform } from 'react-native';
import * as colors from '../Style/Style'
import createStore from '../../state/store';
import actionSetTreatDataTouch from '../../state/actionAddTreatTouch'; 
import actionSetTreatDataExpress from '../../state/actionAddTreatExpress'; 
import actionSetTreatDataConnect from '../../state/actionAddTreatConnect'; 
import { useTranslation } from 'react-i18next';
import treatData from '../../HardCodedData/TreatData'
import * as Fonts from "../Style/Fonts"
import * as Colors from "../Style/Style"
import Table from '../Components/Table'
import Text from "../Components/GillyText"
import * as queries from '../../graphql/queries';
import { getNextTriggerDateAsync } from 'expo-notifications';

var {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;

const ACTUAL_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = ACTUAL_WIDTH <= 414;
const SCREEN_WIDTH = ACTUAL_WIDTH * 0.9;
const PRODUCT_ITEM_HEIGHT = 40;
const PRODUCT_ITEM_OFFSET = 5;


export default function FlatListHorizontal(props)
{
  const { t } = useTranslation('selectTreat');
  let store = createStore();
  const [selectedIndex, setIndex] = React.useState(-1);
  const displayData = treatData;
  const user = props.user;

  const setCurrentData = (index) => {
      setIndex(index);
  }

  const getBGColor = (index, enabled) =>  {
    var color;
    if(enabled){
      color = {backgroundColor: index === selectedIndex 
      ? colors.cardselected
      : colors.cards
      }
    }else{
      color = {backgroundColor: colors.carddisabled}
    }
  
    return color;
  }

  const getTextColor = () => {
    return {color: -1 === selectedIndex 
      ? colors.textDisabled
      : colors.text
    }

  }
 


  const  _renderItem = ({ item, index }) => {
          const textStyle = props.enabled ? styles.titleEnabled : styles.title;
          return (
          <View style={[styles.listElement, getBGColor(index, props.enabled)]} onPress={()=> console.log(index)}> 
            <Pressable onPress={() => setCurrentData(index)} style={[styles.pressable]}>  
            <View>
              <Text style={textStyle}>{item.journeyDescription}</Text>
            </View>
            </Pressable>
          </View>
          );
        };

        
  function InvitePartner() {
    return <View style={[styles.inviteView, styles.centerContent, , styles.viewPlacement]}>
            <TouchableHighlight 
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={()=>{props.navigation.goBack()}}>
              <Text style={styles.inviteText}>
              {t("invite", {who: props.partnerName})}
              </Text>
            </TouchableHighlight>
          </View>
  }

  function getTreatList(){
     
      console.log("getting Treats List... ", user)
      return API.graphql(graphqlOperation(queries.listFormIdByWeeks, {
        filter:{
          week: {
            eq: 1,
          }
        },
      }))
  }

  function getStatus(formId){
    return 1;
  }

  function getData(){
     
    console.log("With treat list ", store.getState())

    if(selectedIndex === 0)
       return store.getState().treatsTouch;
    if(selectedIndex === 1)
       return store.getState().treatsConnect;
    if(selectedIndex === 2)
       return store.getState().treatsExpress;

  }

  React.useEffect(()=>{
    console.log("fetching list", store.getState().treatsTouch);
    if(store.getState().treatsTouch.length === 0){
     
     getTreatList().then((data)=>{
    
       const treatData = data.data.listFormIdByWeeks.items;
       console.log('received treats list ', treatData)
       treatData.map((currentTreat)=>{
        console.log('Map ', currentTreat)
          const status = 1;
          let treatParts = [];
          let description = {type: "text", description: currentTreat.description};
          treatParts.push(description);
          let part1 = {type: "learn", id: currentTreat.p1formId, status: getStatus(currentTreat.p1formId), min: currentTreat.min1};
          treatParts.push(part1);
          let part2 = {type: "solo", id: currentTreat.p2formId,  status: getStatus(currentTreat.p2formId), min: currentTreat.min2};
          treatParts.push(part2);
          let part3 = {type: "couple", id: currentTreat.p3formId,                                status: 4, min: currentTreat.min3};
          treatParts.push(part3);

          if(currentTreat.category === "touch"){   
            store.dispatch(actionSetTreatDataTouch(store.getState().treatsTouch, treatParts)); 
          }
          if(currentTreat.category === "express"){
            store.dispatch(actionSetTreatDataExpress( store.getState().treatsExpress, treatParts)); 
          }
          if(currentTreat.category === "connect"){
            store.dispatch(actionSetTreatDataConnect( store.getState().treatsConnect, treatParts)); 
          }
       })
      // store.dispatch(actionSetTreatDataTouch(store.getState().treatsTouch, touchList)); 
      // console.log("Saved treat list T ", store.getState().treatsTouch);
      // console.log("Saved treat list  C", store.getState().treatsConnect);
      // console.log("Saved treat list  E", store.getState().treatsExpress)
     });
    }

  }, [])

  return  <View style={styles.container}>
            <View style ={styles.carousel}>
              <FlatList
                data={displayData}
                renderItem={_renderItem}
                pagingEnabled={true}
                columnWrapperStyle=""
              // keyExtractor={(item)=>{item.title}} 
                numColumns= {1}
                ListFooterComponent = {<Table data={getData()} navigation={props.navigation}/>}
                //ItemSeparatorComponent={() => <View style={{margin: 5}}/>}
              />
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
        color: Colors.buttonText
    },
    
    titleEnabled:{
      fontSize: Fonts.smallSize,
      marginTop: 0, 
      textAlign: "center",
      color: Colors.buttonText
    },
    carousel:{
        flex: 3,
       
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
 
    listElement: {
      margin: PRODUCT_ITEM_OFFSET,
      overflow: 'hidden',
      borderRadius: 5,
     // width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
     //   PRODUCT_ITEM_MARGIN,
      width: "90%",
      height: PRODUCT_ITEM_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: 'column',
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0,0,0, .2)',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 1,
          shadowRadius: 1,
        },
        android: {
          elevation: 1,
        },
      }),
    },
    elementEnabled:{
      backgroundColor: Colors.cards,
    },
    elementDisabled:{
      backgroundColor: Colors.cards,
    },
    pressable:{
      width: SCREEN_WIDTH / 3,
      height: "100%",
      //height:viewHeight,
      marginHorizontal: 10,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
      
   inviteText: {
    color: "blue",
    textDecorationLine: 'underline',
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
  },

  });
  
  