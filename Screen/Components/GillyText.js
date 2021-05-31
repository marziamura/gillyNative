import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Montserrat_400Regular as montserrat,
} from '@expo-google-fonts/montserrat';


export default function GillyText(props){
  const [text, setText] = React.useState();
   
 
React.useEffect(()=>{
    setText(props.children);
},[])

return <Text style={[{fontFamily: "montserrat"}, props.style]}>{text}</Text>
}
