import React, { Component } from 'react';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';

class DatePicker extends Component {
  handleDateSelect(date) {
    console.log('handling selection!');
    console.log(date);
    var quakes;
    fetch("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson")
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
