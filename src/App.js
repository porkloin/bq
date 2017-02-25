import React, { Component } from 'react';
import DatePicker from './DatePicker';
import QuakeMap from './QuakeMap';
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
  setQuakeState(myQuakes) {
    const quakes = myQuakes;
    this.setState({quakes}); 
  }
  render() {
    return (
      <div className="App">
        <h1>Birthquakes!</h1>
        <center>
          <DatePicker myToday={this.state.today} myMinDate={this.state.minDate} quakeMethod={this.setQuakeState} selectedDate={this.state.selectedDate} />
        </center>
        <QuakeMap quakes={this.state.quakes}/>
      </div>
    );
  }
}

export default App;
