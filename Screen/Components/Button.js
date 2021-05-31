import React from 'react';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Montserrat_400Regular as montserrat,
  } from '@expo-google-fonts/montserrat';

import {
  StyleSheet,
  Pressable,
  Text
} from 'react-native';
import * as colors from '../Style/Style';

function Button(props){
 

    const styles = StyleSheet.create({
        buttontext: { 
            borderColor: colors.border,
            color: colors.buttonText,
            fontSize: 17,
            fontFamily: "montserrat",
            fontWeight: "700",  
          
        },
    
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            height: 40,
            borderColor: colors.border,
            borderRadius: 8,
            borderWidth: 1,
            backgroundColor: colors.buttonBackground,
        }
     
    })
    
    return (
     
           <Pressable style={[styles.button, props.pressableStyle]} onPress={props.onPress} disabled={props.disabled}>
            <Text style={[styles.buttontext, props.textStyle]}> 
                {props.text}
            </Text>
          </Pressable> 
  
    )

}


export default Button
