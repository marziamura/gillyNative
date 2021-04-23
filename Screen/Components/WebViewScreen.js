// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { WebView } from 'react-native-webview';
import Background from './Background';






const WebViewScreen = (props) => {
    
    const webView = React.useRef();
    const [stopping, setStopping] = React.useState(false);
    
    console.log("WebView Screen ", props);

    
    function getPageView(){
      const handleWebViewNavigationStateChange = (newNavState)=>{
        const { url } = newNavState;
        if (url.includes('app.getgilly.com') && !stopping) {
          try{
          console.log("Stooooop loading", url);
          setStopping(true);
          webView.current.stopLoading();
          props.navigation.replace(props.afterSubmission);
          }catch(error){
            console.log("error stoploading", error);
            props.navigation.replace(props.afterSubmission);
          }
        }
      }

      try{
        return   <WebView   source={{ uri: props.url }} 
        style={styles.html}
        ref = {webView}
        onNavigationStateChange={handleWebViewNavigationStateChange}
  
         />    
      }catch(error){
        console.log(error);
        return <Text>
        An error has occurred
        </Text>
      }

    }
   
  return (
    <Background>
   
     { window.location && <Text>
          {props.url}
      </Text>
     }
       {getPageView()} 

    </Background>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
  
    },
    html: {
      marginTop: 20,
      maxHeight: '100%',
      width: '100%'
    }
  });

export default WebViewScreen;