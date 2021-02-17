import React from 'react';


import {
  StyleSheet,
  Pressable,
  Text,
  View
} from 'react-native';

function Button(props){
    
    return (
     
           <Pressable style={styles.button} onPress={props.press}>
            <Text style={{...props.style, ...styles.buttontext}}> 
                {props.title}
            </Text>
          </Pressable> 
  
    )

}

const styles = StyleSheet.create({
    buttontext:{
        fontSize: 21,
        alignSelf: 'center',
        justifyContent:'center'
    },
    button:{
         backgroundColor: "white",
         alignItems: 'center',
         borderWidth: 1,
         borderRadius: 16,
         height: 40,
    }
})

export default Button
