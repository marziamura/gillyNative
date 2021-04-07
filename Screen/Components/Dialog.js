  
  import React, { useState } from "react";
  import { View, StyleSheet, Button, Alert } from "react-native";

  function Dialog(props){
    const [dialogOpen, setDialogOpen] = React.useState(false);
 
    const onDeny = () => {
    //  var pushConsent ={ consent : "Deny"};
    //  store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setDialogOpen(false);
    };

    const onOkay = () => {
    //  var pushConsent = { consent : "OK"};
   //   store.dispatch(actionSetPushNotificationPreferences(pushNotificationPreferences, [pushConsent]));
      setDialogOpen(false);
    };
    
    return Alert.alert(props.title, props.message)
  }