import { connect } from "react-redux";
import { API, graphqlOperation } from 'aws-amplify';
import actionSetUserInfo from "./actionSetUserInfo"
import createStore from "./store"
import * as queries from '../graphql/queries';
import actionUpdateJourneyStatus from './actionUpdateJourneyStatus';
import * as mutations from '../graphql/mutations';
import actionSetInitialPushNotificationPreferences from "./actionSetInitialPushNotificationPreferences";

const store = createStore();

export function getSubmissionsInJourney(user, journey){

  console.log("getting journey Info... ", user, journey)
  return API.graphql(graphqlOperation(queries.listFormSubmissions, {
    userId: user.id,
    filter:{
      journey: {
        eq: journey,
      }
    },
  }))
}

export function getAllSubmissions(user){
  
  console.log("getting journey Info... ", user.journey)
  return API.graphql(graphqlOperation(queries.listFormSubmissions, {
    userId: user.id,
    sort: {
      field : "updatedAt",
      order: "DESC"
   }
  })).then((data)=>{
  //  console.log("submissions ", data)
    var submissions = data.data.listFormSubmissions.items;
    user.todaysTreatDone = false;
    if(submissions.length === 0)
    {
      user.todaysTreatDone = true;
      user.lastTreatInJourney = 0;
      store.dispatch(actionUpdateJourneyStatus(store.getState().userInfo, [user]));
      return user;
    }
   // console.log("before sorting ", submissions)
    submissions.sort((a, b)=>{
      // console.log("sorting ",Date.parse(a.updatedAt) ,Date.parse(b.updatedAt), Date.parse(a.updatedAt) - Date.parse(b.updatedAt) )
       return  Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
    })
  
    var lastSubmittedDate = new Date(submissions[submissions.length -1].updatedAt).toLocaleDateString();

    var today = new Date();
    var cDay = submissions.length;
  //  console.log('Submissions and current Day', submissions.length, cDay,  lastSubmittedDate, today.toLocaleDateString());

    if(lastSubmittedDate === today.toLocaleDateString()){
      user.todaysTreatDone = true;
    }
 //   console.log('Submissions and adjusted current day', store.getState().userInfo[0], user);
    user.lastTreatInJourney = cDay;
    store.dispatch(actionUpdateJourneyStatus(store.getState().userInfo, [user]));
    return user;
    
  }).catch((e)=>{
    console.log('Error retrieving journey info ', e);
    return user;
  })
}

export function getUserInfo () { 
    
    const currentUser = store.getState().userInfo[0];
  //  console.log("retrieving user...", currentUser);
    if(currentUser.id === "xxx"){
      return Promise.reject("invalid user id ", currentUser.id);
    }

    var userId = currentUser.id;
    console.log("retrieving user with id  ", userId);
    return API.graphql(graphqlOperation(queries.getUser, {id: userId})).then((u)=>{

      console.log("Gilly user", u);
      var user =  u.data.getUser;
      if(!user){
    
        return null;
      }
      

      user.registered = true;
      user.userName = currentUser.userName;

      store.dispatch(actionSetUserInfo(store.getState().userInfo, [user]));
      var PNToken = user.pushNotificationToken || "";
      console.log("User with updated journey info", user, " token#", PNToken,"#");
      store.dispatch(actionSetInitialPushNotificationPreferences(store.getState().pushNotificationPreferences, [PNToken]));

      return getAllSubmissions(user);
       
    }).catch((error)=>{
      console.log(error);
      return error;
    });

  };

  function userInfo(info) {
    console.log("call to userInfo with ", info);
    let currentInfo = {}
    const storedInfo = store.getState().userInfo[0];
    const pushPreferences = store.getState().pushNotificationPreferences[0];
    if(info){
      currentInfo = {...info};
    }else{
   
      currentInfo.id=storedInfo.id
      currentInfo.partnerID=storedInfo.partnerID;
      currentInfo.userName=storedInfo.userName;
      currentInfo.journey=storedInfo.journey;
      currentInfo.sex=storedInfo.sex;
      currentInfo.gender=storedInfo.gender;
      currentInfo.partnerID=storedInfo.partnerID;
      currentInfo.email=storedInfo.email;
      currentInfo.password=storedInfo.password;
      currentInfo.primary=storedInfo.primary;
      currentInfo.registered=storedInfo.registered;
    
      if(pushPreferences.consent === "OK"){
        currentInfo.pushNotificationToken= storedInfo.pushNotificationToken;
      }
      if(pushPreferences.consent === "Deny"){
        currentInfo.pushNotificationToken= "";
      }
      console.log("Saving User Info", currentInfo, pushPreferences, "#",storedInfo.pushNotificationToken,"#");
    } 
    store.dispatch(actionSetUserInfo(store.getState().userInfo, [currentInfo]));
    currentInfo.userName = "xxx";
    currentInfo.email = "xxx";
    delete currentInfo.password;
    delete currentInfo.lastTreatInJourney;
    delete currentInfo.todaysTreatDone;
    currentInfo.tel = "0";
    console.log("Saving User Info 2", currentInfo, pushPreferences, storedInfo.pushNotificationToken);
    return currentInfo;
  }

  export function updateUserInfo(info){
    console.log("updateUserInfo 0", info);
    let currentInfo = userInfo(info);
    console.log("updateUserInfo 1", currentInfo);
    var dt = new Date();
    currentInfo.timeZoneOffset = dt.getTimezoneOffset();
    return API.graphql(graphqlOperation(mutations.updateUser, {input: currentInfo}));  
   }

 export function saveUserInfo(info){
    let currentInfo = userInfo(info);
    var dt = new Date();
    currentInfo.timeZoneOffset = dt.getTimezoneOffset();
    return API.graphql(graphqlOperation(mutations.createUser, {input: currentInfo}));
}

  