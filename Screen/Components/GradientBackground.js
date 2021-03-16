import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


import {
  ImageBackground,
  StyleSheet,
  View
} from 'react-native';

function Background({children}){

    return (
      <View style={styles.container}>
      <LinearGradient
        colors={['red', 'yellow', 'green' ]}
        style={styles.linearGradient}
      >
       {children}
      </LinearGradient>
    </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
})

export default Background
