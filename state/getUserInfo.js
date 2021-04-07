import { connect } from "react-redux";
import { API, graphqlOperation } from 'aws-amplify';
import actionSetUserInfo from "./actionSetUserInfo"
import createStore from "./store"
import * as queries from '../graphql/queries';
import actionUpdateJourneyStatus from '../state/actionUpdateJourneyStatus'

export function getJourneyInfo(user){
  
  console.log("getting journey Info... ", user.journey)
  const store = createStore();
  return API.graphql(graphqlOperation(queries.listFormSubmissions, {
    filter:{
      userId: {
        eq: user.id,
      },
      journey:{
        eq: user.journey
      }
    },
    sort: {
      field : "updatedAt",
      order: "DESC"
   }
  })).then((data)=>{
    console.log("found submissions ", data)
    console.log("found submissions items ",  data.data.listFormSubmissions.items)
    var submissions = data.data.listFormSubmissions.items;
    console.log("no submissions returning user", submissions);
    user.todaysTreatDone = false;
    if(submissions.length === 0)
    {
      user.todaysTreatDone = false;
      user.lastTreatInJourney = 0;
      store.dispatch(actionUpdateJourneyStatus(user));
      console.log("no submissions returning user", data)
      return user;
    }
    console.log("before sorting ", submissions)
    submissions.sort((a, b)=>{
       console.log("sorting ",Date.parse(a.updatedAt) ,Date.parse(b.updatedAt), Date.parse(a.updatedAt) - Date.parse(b.updatedAt) )
       return  Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
    })
  
    var lastSubmittedDate = new Date(submissions[submissions.length -1].updatedAt).toLocaleDateString();

    var today = new Date();
    var cDay = submissions.length;
    console.log('Submissions and current Day', submissions.length, cDay,  lastSubmittedDate, today.toLocaleDateString());

    if(lastSubmittedDate === today.toLocaleDateString() && partnerDay <= cDay){
      user.todaysTreatDone = true;
    }
    console.log('Submissions and adjusted current day', submissions.length, cDay);
    user.lastTreatInJourney = cDay;
    store.dispatch(actionUpdateJourneyStatus(user));
    return user;
    
  }).catch((e)=>{
    console.log('partner has no submissions ', e);
    return user;
  })
}

function getUserInfo () { 
    const store = createStore();
    const currentUser = store.getState().userInfo[0];
    console.log("retrieving user...", currentUser);
    if(currentUser.id === "xxx"){
      let promise  = new Promise(()=> {});
      promise.reject()
      return promise;
    }
   
    var userId = currentUser.id;
    console.log("retrieving user with id  ", userId);
    return API.graphql(graphqlOperation(queries.getUser, {id: userId})).then((u)=>{

      console.log("Gilly user", u);
      var user =  u.data.getUser;
      if(!user){
        return null;
      }
      if(user.journey === 'Solo' && user.partnerID && user.partnerID !== 'none'){ // I am Partner A
        if (currentUser.journey && currentUser.journey !== "Solo"){
          user.journey =  currentUser.journey + '-A';
        }else{
          user.journey = 'Partnered-A';
        }

      }
      console.log("User with updated journey info", user);
      const userInfo = createStore().userInfo;
      user.registered = true;
      store.dispatch(actionSetUserInfo(userInfo, [user]));

      return getJourneyInfo(user);
       
    }).catch((error)=>{
      console.log(error);
      return error;
    });

  };

  export default getUserInfo;