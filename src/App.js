import Confetti from 'react-confetti';
import React, { Component } from 'react';
import DateChooser from './DateChooser';
import QuakeList from './QuakeList';
import QuakeMap from './QuakeMap';
import Banner from './Banner.js';
import Intro from './Intro.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.setQuakeState = this.setQuakeState.bind(this);
    this.setLiveQuake = this.setLiveQuake.bind(this);
    this.setConfettiNumber = this.setConfettiNumber.bind(this);
    this.shadeToggle = this.shadeToggle.bind(this);
    this.bannerToggle = this.bannerToggle.bind(this);
    this.introToggle = this.introToggle.bind(this);
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
      bannerVisible: 'isNotVisible',
      shadeVisible: 'isVisible',
      introVisible: 'isVisible'
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
  bannerToggle() {
    this.setState({ bannerVisible: 'isVisible' })
  }
  shadeToggle() {
    this.setState({ shadeVisible: 'isNotVisible' })
  }
  introToggle() {
    this.setState({ introVisible: 'isNotVisible' })
  }
  render() {
    return (
      <div className="App">
        <div className={"shade " + this.state.shadeVisible} />
        <QuakeMap data={this.state.quakes} liveQuakeId={this.state.liveQuakeId} />
        <Intro isVisible={this.state.introVisible} />
        <Banner isVisible={this.state.bannerVisible} />
        <div className="mainMenu">
          <QuakeList
            data={this.state.quakes}
            setLiveQuake={this.setLiveQuake}
            liveQuakeId={this.state.liveQuakeId}
          />
          <DateChooser
            myToday={this.state.today}
            myMinDate={this.state.minDate}
            quakeMethod={this.setQuakeState}
            selectedDate={this.state.selectedDate}
            setConfettiNumber={ this.setConfettiNumber }
            confettiNumber={ this.state.confettiNumber }
            shadeToggle={ this.shadeToggle }
            bannerToggle={ this.bannerToggle }
            introToggle={ this.introToggle }
          />
        </div>
        <Confetti numberOfPieces={this.state.confettiNumber} gravity={0.2} />
      </div>
    );
  }
}

export default App;
