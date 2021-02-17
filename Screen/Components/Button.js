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
            <Text style={styles.buttontext}> 
                {props.text}
            </Text>
          </Pressable> 
  
    )

}

const styles = StyleSheet.create({
    buttontext:{
        fontSize: 21,
        color: '#383838'
    },
    button:{
         backgroundColor: "#FFF",
         alignItems: 'center',
         borderWidth: 1,
         borderRadius: 16,
         width: '80%',
         height: 40,
    }
})

export default Button
