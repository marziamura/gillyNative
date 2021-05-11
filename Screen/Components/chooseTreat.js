import React from 'react';
import Carousel from "./carousel"
import createStore from '../../state/store';
import actionSetTreatData from '../../state/actionSetTreatData'
import Constants from 'expo-constants'

import treatDataDev from '../../HardCodedDataDev/TreatData'
import { getSubmissionsInJourney } from '../../state/userInfo';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';



export default function ChooseTreat(props){
const store = createStore();
const env = Constants.manifest.extra.env
var user = props.user;

const [treatData, setTreatData] = React.useState(treatDataDev);



return <Carousel data={treatData} user={user}  buttonText={"open treat"} navigation={props.navigation}/>

}


  