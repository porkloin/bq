import React, { Component } from 'react';
import DatePicker from './DatePicker';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.setQuakeState = this.setQuakeState.bind(this);
    this.state = {
      minDate: "1930-01-01",
      quakes: {},
      selectedDate: null,
      currentDate: null,
      calendarVisible: false
    }
  }
  setQuakeState(quakes) {
    this.setState({quakes: quakes}); 
  }
  render() {
    return (
      <div className="App">
        <h1>Birthquakes!</h1>
        <center>
          <DatePicker myToday={this.state.today} myMinDate={this.state.minDate} setQuakeState={this.state.setQuakeState} selectedDate={this.state.selectedDate} />
        </center>
      </div>
    );
  }
}

export default App;
