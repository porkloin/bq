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
      quakes: null,
      selectedDate: null,
      currentDate: null,
      calendarVisible: false
    }
  }
  setQuakeState(myQuakes) {
    const quakes = myQuakes;
    this.setState({quakes: quakes}); 
  }
  render() {
    return (
      <div className="App">
        <DatePicker myToday={this.state.today} myMinDate={this.state.minDate} quakeMethod={this.setQuakeState} selectedDate={this.state.selectedDate} />
        <QuakeMap data={this.state.quakes}/>
      </div>
    );
  }
}

export default App;
