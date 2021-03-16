import React from 'react';


import {
  ImageBackground,
  StyleSheet
} from 'react-native';

function Background({children}){

    return (
        <ImageBackground source={require('../../assets/background_gradient.png')} style={styles.backgroundImage}>
            {children}
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      alignSelf: 'stretch',
    }
})

export default Background
