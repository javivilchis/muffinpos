import React from 'react';
import Moment from 'react-moment';


export default class DateTime extends React.Component {
    
     render() {
         return (
          
          <Moment date={new Date()} format="YYYY/MM/DD" />
         );
     }
 }