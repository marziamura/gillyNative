import React from 'react';


import {
  ImageBackground,
  StyleSheet
} from 'react-native';

function Background({children}){

 // return <React.Fragment> {children} </React.Fragment>
    return (
        <ImageBackground  style={styles.backgroundImage}>
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
