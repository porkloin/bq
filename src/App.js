import Confetti from 'react-confetti';
import React, { Component } from 'react';
import DateChooser from './DateChooser';
import QuakeList from './QuakeList';
import QuakeMap from './QuakeMap';
import Banner from './Banner.js';
import Intro from './Intro.js';
import ReactScrollBar from 'react-scrollbar-js';
import TopQuake from './TopQuake.js';
import InfoTable from './InfoTable.js';
import './App.css';
import './MainMenu.css';
import './Stages.css';

class App extends Component {
  constructor() {
    super();
    this.setQuakeState = this.setQuakeState.bind(this);
    this.setLiveQuake = this.setLiveQuake.bind(this);
    this.setConfettiNumber = this.setConfettiNumber.bind(this);
    this.introToggle = this.introToggle.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.printViewToggle = this.printViewToggle.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.state = {
      minDate: "1930-01-01",
      quakes: {
        type: 'FeatureCollection',
        features: []
      },
      topQuake: null,
      stage: "introScreen",
      nameInput: "nameNotInput",
      selectedDate: null,
      currentDate: null,
      calendarVisible: false,
      liveQuakeId: 0,
      mapCenter: [51.505, -120.09],
      mapZoom: 4,
      confettiNumber: 0,
      quakeClass: 'quakeMap',
      printView: false,
      selectedTitle: null,
      selectedMag: null,
      selectedTime: null,
      selectedLink: null
    }
  }
  modalToggle() {
    if(this.state.stage === "quakeResults") {
      this.setState({stage: "quakeResults modalOpen"});
    }
    else if (this.state.stage === "quakeResults modalOpen") {
      this.setState({stage: "quakeResults"});
    }
  }
  updateZoom(zoom){
    if(this.state.quakes.features.length === 0){
      this.setState({mapZoom: zoom });
    }
    else if (this.state.quakes.features.length > 0) {
      var top = this.state.quakes.features[0].geometry.coordinates;
      this.setState({mapZoom: zoom, mapCenter: [top[1], top[0]]});
    }
  }
  setQuakeState(myQuakes) {
    const quakes = myQuakes;
    if(quakes.features[0]){
      this.setState({
        topQuake: quakes.features[0].properties.title
      })
    };
    if(quakes.features[this.state.liveQuakeId]){
      this.setState({
        selectedTitle: quakes.features[this.state.liveQuakeId].properties.place,
        selectedMag: quakes.features[this.state.liveQuakeId].properties.mag,
        selectedTime: quakes.features[this.state.liveQuakeId].properties.time,
        selectedLink: quakes.features[this.state.liveQuakeId].properties.url
      });
      console.log(quakes.features[this.state.liveQuakeId].properties);
    }
    this.setState({
      quakes: quakes
    });
  }
  setLiveQuake(idex) {
    if(this.state.quakes.features[idex]){
      this.setState({
        selectedTitle: this.state.quakes.features[idex].properties.title,
        selectedMag: this.state.quakes.features[idex].properties.mag,
        selectedTime: this.state.quakes.features[idex].properties.time,
        selectedLink: this.state.quakes.features[idex].properties.url
      });
      console.log(this.state.quakes.features[idex].properties);
    }
    this.setState({ liveQuakeId: idex });
  }
  setConfettiNumber(count) {
    this.setState({ confettiNumber: count });
  }
  setSelectedDate(dateString){
    this.setState({ selectedDate: dateString });
  }
  handleNameInput() {
    this.setState({ nameInput: "nameIsInput"});
  }
  introToggle() {
    this.setState({
      stage: 'quakeResults'
    })
  }
  printViewToggle() {
    this.setState({printView: !this.state.printView});
    if(this.state.printView === true) {
      console.log('toggling for print');
      this.setState({ stage: 'printView' });
      this.setLiveQuake(0);
      this.updateZoom(2);
    }
  }
  render() {
    return (
      <div className={"App " + this.state.stage + " " + this.state.nameInput} >
        <div className="shade" />
        <Intro />
      <Banner
        handleNameInput={this.handleNameInput}
        selectedDate={this.state.selectedDate}
        printViewToggle={this.printViewToggle}
        modalToggle={this.modalToggle}
        topQuake={this.state.topQuake}
      />
        <QuakeMap quakeClass={this.state.quakeClass} updateZoom={this.updateZoom} mapCenter={this.state.mapCenter} mapZoom={this.state.mapZoom} data={this.state.quakes} liveQuakeId={this.state.liveQuakeId} printView={this.state.printView} />
        <TopQuake topQuake={this.state.topQuake} />
        <InfoTable modalToggle={this.modalToggle} />
        <div className="bottomWrapper">
          <div className="mainMenu">
              <ReactScrollBar className="quakeList">
              <QuakeList
                data={this.state.quakes}
                setLiveQuake={this.setLiveQuake}
                liveQuakeId={this.state.liveQuakeId}
                modalToggle={this.modalToggle}
              />
            </ReactScrollBar>
            <DateChooser
              myToday={this.state.today}
              myMinDate={this.state.minDate}
              quakeMethod={this.setQuakeState}
              selectedDate={this.state.selectedDate}
              setConfettiNumber={ this.setConfettiNumber }
              confettiNumber={ this.state.confettiNumber }
              introToggle={ this.introToggle }
              setSelectedDate={this.setSelectedDate}
            />
          </div>
      <a href="http://www.earthscope.org"><img className="es-logo light" src="eslogolight.png" /></a>
      <a href="http://www.earthscope.org"><img className="es-logo dark" src="eslogodark.png" /></a>
        </div>
        <Confetti numberOfPieces={this.state.confettiNumber} gravity={0.2} />
      </div>
    );
  }
}

export default App;
