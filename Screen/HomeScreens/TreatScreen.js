// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import createStore from '../../state/store';
import Background from '../Components/Background';



console.log("loading TreatScreen");



const TreatScreen = ({navigation}) => {
    let store = createStore(); 
    const treatData = store.getState().currentTreat[0];   
    const user = store.getState().userInfo[0]; 

    

    
    
    var source = "https://getgilly.typeform.com/to/";
    var params = '&userid=' + user.id 
                + '&firstname=' + user.name
                + '&puserid=' + user.partnerID
                + "&email=" + user.email
                + "&journey=" + user.journey;
    const typeformLink = source + treatData.id + "#" + params;// + "&" + previousAnswers;
    console.log("TypeFormLink ->", typeformLink);
 
 /*   function f() {
      let elements = document.querySelectorAll("button" );

      for (let elem of elements) {
        if (elem.innerHTML.includes("Treat complete")){
          alert("elem.innerHTML");
          elem.addEventListener("onclick", function() {
            alert("message from webview button clicked");
            window.ReactNativeWebView.postMessage(JSON.stringify(elem.innerHTML));  
          })
          elem.addEventListener("submit", function() {
            alert("message from webview button clicked");
            window.ReactNativeWebView.postMessage(JSON.stringify(elem.innerHTML));  
          })
        }
      }
    }*/
    
    function getPageView(){
  /*    const INJECTED_JAVASCRIPT = `(function respondToVisibility() {
        let options = {
          root: null, // relative to document viewport 
          rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
          threshold: 1.0 // visible amount of item shown in relation to root
        };
      
        var callback = (val)=>alert(val);
        
        var observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            callback(entry.intersectionRatio);
          });
        }, options);
      
        var elements = document.querySelectorAll("h1");
        
        for (var elem of elements) {
      
                if (elem.innerHTML.includes("Well done")){
                    alert(elem.innerHTML);
                    observer.observe(elem);
                }
        }
      })();`;

      const INJECTED_JAVASCRIPT2 = `(function getClick(){
        var elements = document.getElementById("root");
  
        for (var elem of elements) {
            alert(elem.innerHTML);
            elem.addEventListener("touchend", (event)=> {alert(event))
            elem.addEventListener("pointerup",()=> alert("pointerup"))
          
        }
      })()`;*/
      try{
        return   <WebView   source={{ uri: typeformLink }} 
        style={styles.html}
        //injectedJavaScript={INJECTED_JAVASCRIPT2}
        onMessage={(m) => alert(m)}
         />    
      }catch(error){
        console.log(error);
        return <Text>
        Treat done!
           </Text>
      }

    }
   
  return (
    <Background>
     { window.location && <Text>
          {typeformLink}
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

export default TreatScreen;