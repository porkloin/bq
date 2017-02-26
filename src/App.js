import React, { Component } from 'react';
import DatePicker from './DatePicker';
import QuakeList from './QuakeList';
import QuakeMap from './QuakeMap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.setQuakeState = this.setQuakeState.bind(this);
    this.setLiveQuake = this.setLiveQuake.bind(this);
    this.state = {
      minDate: "1930-01-01",
      quakes: {
        type: 'FeatureCollection',
        features: []
      },
      selectedDate: null,
      currentDate: null,
      calendarVisible: false,
      liveQuakeId: 0
    }
  }
  setQuakeState(myQuakes) {
    const quakes = myQuakes;
    this.setState({quakes: quakes}); 
  }
  setLiveQuake(idex) {
    this.setState({ liveQuakeId: idex });
  }
  render() {
    return (
      <div className="App">
        <DatePicker myToday={this.state.today} myMinDate={this.state.minDate} quakeMethod={this.setQuakeState} selectedDate={this.state.selectedDate} />
        <QuakeMap data={this.state.quakes} liveQuakeId={this.state.liveQuakeId} />
        <QuakeList data={this.state.quakes} setLiveQuake={this.setLiveQuake} liveQuakeId={this.state.liveQuakeId} />
      </div>
    );
  }
}

export default App;
