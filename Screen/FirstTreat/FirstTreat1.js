// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {Text, Button} from 'react-native';
import { useTranslation } from 'react-i18next';
import createStore from '../../state/store';


import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';



const FirstTreat1 = ({navigation}) => {
  const { t } = useTranslation('FirstTreat');
  const [animating, setAnimating] = useState(true);
  const userInfo = createStore().getState().userInfo[0];
  console.log("userInfo ", userInfo);

  return (
    <View style={styles.container}>

       <View style={styles.SectionStyle}>
        <Text>
         {t("title")}
        </Text>
      </View>
      <Text>
        {t("introduction")}
      </Text>
      <Text>
        {t("text", {name:userInfo.userName})}
      </Text>

      <Button
        onPress={() => navigation.replace("HomeNavigationRoutes")}
        title="Home"
        color="#841584"
        accessibilityLabel="Home"
      />
        
    </View>
  );
};

export default FirstTreat1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  image:{

  }
 

});