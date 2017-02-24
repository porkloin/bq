import React, { Component } from 'react';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';

class DatePicker extends Component {
  constructor() {
    super();
    this.handleDateSelect = this.handleDateSelect.bind(this);
  }
  handleDateSelect(date) {
    console.log('handling selection!');
    console.log(date);
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
