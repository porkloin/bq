import React, { Component } from 'react';
import {DateField, DatePicker} from 'react-date-picker';
import moment from 'moment';
import 'react-date-picker/index.css';
import './DateChooser.css';

class DateChooser extends Component {
  handleDateSelect(date) {
    console.log('handling selection!');
    var tomorrow = moment(date).add(1,'day').format("YYYY-MM-DD");
    this.props.setSelectedDate(moment(date).format("MMMM Do, YYYY"));
    console.log(tomorrow);
    fetch("http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + date + "&endtime=" + tomorrow + "&limit=3&orderby=magnitude")
    .then( (response) => {
      return response.json()
    })
    .then( (json) => {
      this.props.quakeMethod(json);
      this.props.introToggle();
      this.props.setConfettiNumber(200);
      //setInterval(() => if(this.props.confettiNumber > 0) {this.props.setConfettiNumber(this.props.confettiNumber - 1)} else { clearInterval() }, 200);
      setTimeout(() => this.props.setConfettiNumber(100), 4000);
      setTimeout(() => this.props.setConfettiNumber(50), 8000);
      setTimeout(() => this.props.setConfettiNumber(30), 10000);
      setTimeout(() => this.props.setConfettiNumber(10), 12000);
      setTimeout(() => this.props.setConfettiNumber(0), 14000);
    }).catch(function() {
      console.log("Failed to get http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + date + "&endtime=" + tomorrow + "&limit=3&orderby=magnitude")
      console.log("Network error?");
      console.log('Sorry, a network error has occured and earthquake data is temporarily unavailable.')
    });
  }
render() {
    return (
      <DateField
        dateFormat="YYYY-MM-DD"
        updateOnDateClick={true}
        collapseOnDateClick={true}
        onChange={(dateString) => { this.handleDateSelect(dateString) }}
        maxDate={moment()}
      >
        <input placeholder="Click to enter your birthdate" type="text" name="DateOfBirth" />
        <DatePicker
          weekNumbers={false}
          highlightWeekends={false}
          position={"top"}
        />
      </DateField>
    );
  }
}

export default DateChooser;
