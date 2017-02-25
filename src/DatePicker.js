import React, { Component } from 'react';
import {DateField} from 'react-date-picker';
import moment from 'moment';
import 'react-date-picker/index.css';
import './DatePicker.css';

class DatePicker extends Component {
  handleDateSelect(date) {
    console.log('handling selection!');
    var tomorrow = moment(date).add(1,'day').format("YYYY-MM-DD");
    console.log(date);
    console.log(tomorrow);
    fetch("http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + date + "&endtime=" + tomorrow + "&limit=15")
    .then( (response) => {
      return response.json() 
    })
    .then( (json) => {
      this.props.quakeMethod(json);
    });
  }
render() {
    return (
      <DateField
        dateFormat="YYYY-MM-DD"
        updateOnDateClick={true}
        collapseOnDateClick={true}
        onChange={(dateString) => { this.handleDateSelect(dateString) }}
      />
    );
  }
}

export default DatePicker;
