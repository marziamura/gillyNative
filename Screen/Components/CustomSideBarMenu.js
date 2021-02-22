// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Auth } from 'aws-amplify';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';



const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
    
        <Image
          source={require("../../assets/gilly-icon.png")}
          style={{width: 40, height: 40, marginLeft: 5}}
        />
    
        <Text style={stylesSidebar.profileHeaderText}>
          Gilly Menu
        </Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
     
        <DrawerItem
          label={({color}) => 
            <Text style={stylesSidebar.menuText}>
              Home
            </Text>
          }
          onPress={() => {
             props.navigation.push('Home');
             props.navigation.toggleDrawer();
          }}
        />
        <DrawerItem
          label={({color}) => 
            <Text style={stylesSidebar.menuText}>
              Logout
            </Text>
          }
          onPress={() => {
             props.navigation.toggleDrawer();
             Auth.signOut();
             props.navigation.replace('Auth');
            }}
        />
        
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1DE7C0',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#1DE7C0',
    padding: 15,
    textAlign: 'center',
  },

  menuText: {
    color: '#9474FF',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});