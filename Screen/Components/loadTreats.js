import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Dimensions, ActivityIndicator } from 'react-native';
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

var {width, height} = Dimensions.get('window')
const viewHeight = height * 2 / 7 - 60;
const SCREEN_WIDTH = width;

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
          return (
          <View style={[styles.listElement, getBGColor(index)]} onPress={()=> console.log(index)}> 
            <Pressable onPress={() => setCurrentData(index)} style={[styles.pressable]}>  
            <View>
              <Text style={styles.title}>{item.journeyDescription}</Text>
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
            
                ItemSeparatorComponent={() => <View style={{margin: 10}}/>}
              />
            </View>
            <View style ={styles.description}>
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
  </View>

}



const styles3 = StyleSheet.create({
    container: {
      flex: 1, 
      width: "100%",
  
    },
    carousel:{
      flex: 1,
   },

    title:{
      fontSize: Fonts.smallSize,
        marginTop: 0, 
        textAlign: "center",
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
      borderRadius: 15,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressable:{
      width: SCREEN_WIDTH / 2,
      height: "100%",
      marginHorizontal: 10,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    }

  });
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
  
  