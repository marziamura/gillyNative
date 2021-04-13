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
           
            borderColor: colors.border,
            color: colors.buttonText,
            fontSize: 15,
            fontWeight: "500",
            ...props.pressableStyle
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            height: 40,
            borderColor: colors.border,
            borderRadius: 24,
            borderWidth: 1,
            backgroundColor: colors.buttonBackground,
            ...props.textStyle,
       }
     
    })
    
    return (
     
           <Pressable style={styles.button} onPress={props.onPress} disabled={props.disabled}>
            <Text style={styles.buttontext}> 
                {props.text}
            </Text>
          </Pressable> 
  
    )

}


export default Button
