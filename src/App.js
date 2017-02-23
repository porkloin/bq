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
        <h1>Derp!</h1>
        <center>
          <DatePicker myToday={this.state.today} myMinDate={this.state.minDate} setQuakeState={this.state.setQuakeState}/>
        </center>
      </div>
    );
  }
}

export default App;
