import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Dimensions, ActivityIndicator
  , TouchableHighlight, Platform } from 'react-native';
import Button from './Button'
import * as colors from '../Style/Style'
import { getSubmissionsInJourney, getFormId } from '../../state/userInfo';
import createStore from '../../state/store';
import actionSetTreatData from '../../state/actionSetTreatData';
import { useTranslation } from 'react-i18next';
import treatData from '../../HardCodedData/TreatData'
import * as Fonts from "../Style/Fonts"
import * as Colors from "../Style/Style"
import Table from './Table'
import Text from "./GillyText"

var {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;

const ACTUAL_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = ACTUAL_WIDTH <= 414;
const SCREEN_WIDTH = ACTUAL_WIDTH * 0.9;
const numColumns = isSmallDevice ? 2 : 3;
const PRODUCT_ITEM_HEIGHT = 40;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

export default function FlatListHorizontal(props)
{
  const { t } = useTranslation('selectTreat');
  let store = createStore();
  const [description, setDescription] = React.useState(t("selectMood"));
  const [selectedIndex, setIndex] = React.useState(-1);
  const [loading, setLoading] = React.useState(true);

  const displayData = treatData;
  const user = props.user;

  const setCurrentData = (index) => {
      
      setLoading(true);  
      setIndex(index);
      setDescription("");
      getTreatInfo(index);
  }

  const executeAction = () => {
    props.navigation.push("TodaysTreat");
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
 
  function formIdCallback(tdata){
    console.log("formId Callback ", tdata);
    if(!tdata.formId){
      setDescription(t("treatNotFound"));
      return;
    }
    var fId = tdata.formId; 
    console.log("getFormId ", fId,  tdata.description);
    let  currentData={
      id: fId,
      description:  tdata.description,
      journey: tdata.journey,
    }
    setDescription(currentData.description);
    store.dispatch(actionSetTreatData([currentData])); 
    setLoading(false);
  
  }

  const getTreatInfo = (selected) =>{
    console.log("Selected category: ", selected)
    var journey = displayData[selected].journey;
    console.log("selected journey, ", selected, journey);
    getSubmissionsInJourney(user, journey).then((jdata)=>{
      console.log(jdata);    
      var submissions = jdata.data.listFormSubmissions.items;
      var nbOfSubmissions = submissions.length;
      getFormId(nbOfSubmissions, journey, formIdCallback, (error)=>{alert(error.message)});
    }).catch((error)=>{alert(error.message)})
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
              onPress={()=>{props.navigation.push("InvitePartner")}}>
              <Text style={styles.inviteText}>
              {t("invite", {who: props.partnerName})}
              </Text>
            </TouchableHighlight>
          </View>
  }

  React.useEffect(()=>{

  })

  return  <View style={styles.container}>
            <View style ={styles.carousel}>
              <FlatList
                data={displayData}
                renderItem={_renderItem}
                pagingEnabled={true}
                columnWrapperStyle=""
              // keyExtractor={(item)=>{item.title}} 
                numColumns= {1}
                ListFooterComponent = {<Table type={selectedIndex}/>}
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
  
  