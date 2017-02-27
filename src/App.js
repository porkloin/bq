import Confetti from 'react-confetti';
import React, { Component } from 'react';
import DateChooser from './DateChooser';
import QuakeList from './QuakeList';
import QuakeMap from './QuakeMap';
import Banner from './Banner.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.setQuakeState = this.setQuakeState.bind(this);
    this.setLiveQuake = this.setLiveQuake.bind(this);
    this.setConfettiNumber = this.setConfettiNumber.bind(this);
    this.state = {
      minDate: "1930-01-01",
      quakes: {
        type: 'FeatureCollection',
        features: []
      },
      selectedDate: null,
      currentDate: null,
      calendarVisible: false,
      liveQuakeId: 0,
      confettiNumber: 0,
      bannerVisible: 'isNotVisible'
    }
  }
  setQuakeState(myQuakes) {
    const quakes = myQuakes;
    this.setState({quakes: quakes});
  }
  setLiveQuake(idex) {
    this.setState({ liveQuakeId: idex });
  }
  setConfettiNumber(count) {
    this.setState({ confettiNumber: count });
  }
  render() {
    return (
      <div className="App">
        <QuakeMap data={this.state.quakes} liveQuakeId={this.state.liveQuakeId} />
        <Banner isVisible={this.state.bannerVisible}/>
        <div className="mainMenu">
          <DateChooser
            myToday={this.state.today}
            myMinDate={this.state.minDate}
            quakeMethod={this.setQuakeState}
            selectedDate={this.state.selectedDate}
            setConfettiNumber={ this.setConfettiNumber }
            confettiNumber={ this.state.confettiNumber }
          />
          <QuakeList
            data={this.state.quakes}
            setLiveQuake={this.setLiveQuake}
            liveQuakeId={this.state.liveQuakeId}
          />
        </div>
        <Confetti numberOfPieces={this.state.confettiNumber} gravity={0.2} />
      </div>
    );
  }
}

export default App;
