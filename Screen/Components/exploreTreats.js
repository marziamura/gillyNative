import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions, ActivityIndicator
  , TouchableHighlight, Platform } from 'react-native';
import Button from './Button'
import * as colors from '../Style/Style'
import { getSubmissionsInJourney } from '../../state/userInfo';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import createStore from '../../state/store';
import actionSetTreatData from '../../state/actionSetTreatData';
import { useTranslation } from 'react-i18next';
import treatData from '../../HardCodedData/TreatData'
import * as Fonts from "../Style/Fonts"
import * as Colors from "../Style/Style"


var {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;

const ACTUAL_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = ACTUAL_WIDTH <= 414;
const SCREEN_WIDTH = ACTUAL_WIDTH * 0.9;
const numColumns = isSmallDevice ? 2 : 3;
const PRODUCT_ITEM_HEIGHT = 60;
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
      color=colors.carddisabled;
    }
  
    return color;
  }

  const getTextColor = () => {
    return {color: -1 === selectedIndex 
      ? colors.textDisabled
      : colors.text
    }

  }
 
  const getTreatInfo = (selected) =>{
    console.log("Selected category: ", selected)
    var journey = displayData[selected].journey;
    console.log("selected journey, ", selected, journey);
    var currentData;
    getSubmissionsInJourney(user, journey).then((jdata)=>{
      console.log(jdata);
      
      var submissions = jdata.data.listFormSubmissions.items;
      var nbOfSubmissions = submissions.length;
      getFormId(nbOfSubmissions, journey).then((tdata)=>{
        console.log(tdata);
        if(!tdata.data.getFormId){
          setDescription(t("treatNotFound"));
          return;
        }
        var fId = tdata.data.getFormId.formId; 
        console.log("getFormId ", fId,  tdata.data.getFormId.description);
        currentData={
          id: fId,
          description:  tdata.data.getFormId.description,
          journey: journey,
        }
        setDescription(currentData.description);
        store.dispatch(actionSetTreatData([currentData])); 
        setLoading(false);
      
      }).catch((error)=>{
        alert(error.message);
      })
    }).catch((error)=>{
      alert(error.message);
    })
  }


  function getFormId(nb, journey){
    return API.graphql(graphqlOperation(queries.getFormId,{
      day: nb,
      journey: journey,
    }))
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

        
  function TreatDescription(){
    return           <View style ={styles.description}>
    <View style={{flex: 4}}>
        <Text style ={[styles.textSmall, getTextColor()]}>{description}</Text>
    </View>
    <View style ={{flex: 2}}>
      {
        !loading && <Button text={t("button")} onPress={() => executeAction()}/>
      }
      {
        (loading && selectedIndex !== -1) && <ActivityIndicator  size="small" color="#0000ff"/>
      }
      </View>
    </View>
  }

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

  function ListFooter(){
    return props.enabled ? <TreatDescription/> : <InvitePartner/>
  }

  return  <View style={styles.container}>
            <View style ={styles.carousel}>
              <FlatList
                data={displayData}
                renderItem={_renderItem}
                pagingEnabled={true}
                columnWrapperStyle=""
              // keyExtractor={(item)=>{item.title}} 
                numColumns= {2}
                ListFooterComponent = {<ListFooter/>}
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
        color: Colors.text
    },
    
    titleEnabled:{
      fontSize: Fonts.smallSize,
      marginTop: 0, 
      textAlign: "center",
      color: Colors.textEnabled
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
      borderRadius: 3,
      width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
        PRODUCT_ITEM_MARGIN,
      height: PRODUCT_ITEM_HEIGHT,
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
  
  