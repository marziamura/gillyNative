import React from 'react';
import AboutBase from './AboutBase';


const AboutGilly1 = (props) => {
 

  return (
    <AboutBase namespace="About1" next="AboutGilly2" navigation={props.navigation}/>
  );
};

export default AboutGilly1;
