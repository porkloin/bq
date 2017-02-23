import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

class DatePicker extends Component {
  handleDateSelect() {
    console.log('handling selection!');
  }
  render() {
    return (
      <InfiniteCalendar
        width={400}
        height={600}
        disabledDays={[0,6]}
        min={this.props.myMinDate}
        keyboardSupport={true}
      />
    );
  }
}

export default DatePicker;
