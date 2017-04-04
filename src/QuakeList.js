import React, { Component } from 'react';
import Quake from './Quake';
import './QuakeList.css';

class QuakeList extends Component {
  activeCheck(index, live) {
    if(Number(index) === Number(live)){
      return "active";
    }
    else{
      return"notActive";
    }
  }
  render() {
      return (
        <div className={"QuakeList " + this.props.isVisible } >
          <h2 className="blue">The three biggest earthquakes on your birthday were:</h2>
            <div className="inner">
            {
              Object
                .keys(this.props.data.features)
                .map(key => <Quake key={key} index={key} details={this.props.data.features[key]} liveQuakeId={this.props.liveQuakeId} setLiveQuake={this.props.setLiveQuake } modalToggle={this.props.modalToggle} active={this.activeCheck(key, this.props.liveQuakeId)} />)
            }
          </div>
        </div>
      );
    }
  }

export default QuakeList;
