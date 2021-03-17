import { connect } from "react-redux";
import { API, graphqlOperation } from 'aws-amplify';
import actionSetUserInfo from "./actionSetUserInfo"
import createStore from "./store"
import * as queries from '../graphql/queries';



function getUserJourneyInfo () { 
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
    /*  if(user.journey === 'Solo' && user.partnerID !== 'none'){ // I am Partner A
        if (currentUser.journey !== "Solo"){
          user.journey =  currentUser.journey + '-A';
        }else{
          user.journey = 'Partnered-A';
        }

      }*/
      console.log("User with updated journey info", user);
      user.registered = true;
      store.dispatch(actionSetUserInfo(store.getState().userInfo, [user]));
      return user;
    }).catch((error)=>{
      console.log(error);
      return error;
    });

  };

  export default getUserJourneyInfo;