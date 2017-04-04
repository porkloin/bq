import React, { Component } from 'react';
import './TopQuake.css';

class TopQuake extends Component {
  render() {
    return(
      <h2 className="topQuake">{this.props.topQuake}</h2>
    );
  }
}

export default TopQuake;
