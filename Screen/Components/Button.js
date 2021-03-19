import React from 'react';


import {
  StyleSheet,
  Pressable,
  Text
} from 'react-native';
import * as colors from '../Style/Style';

function Button(props){
 
    const styles = StyleSheet.create({
        buttontext: {
            fontSize: 21,
            alignSelf: 'center',
            justifyContent:'center',
            color: colors.buttonText,
            ...props.styletext
        },
        button: {
            backgroundColor: "white",
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 16,
            height: 40,
            ...props.styleover,
       }
    })
    
    return (
     
           <Pressable style={styles.button} onPress={props.press} disabled={props.disabled}>
            <Text style={styles.buttontext}> 
                {props.title}
            </Text>
          </Pressable> 
  
    )

}


export default Button
