import React, { Component } from 'react';

class Quake extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(key) {
    console.log(key);
    this.props.setLiveQuake(key);
  }
  render() {
      return (
        <p onClick={ () => this.handleClick(this.props.index) }> {this.props.details.properties.title}</p>
      );
    }
  }

export default Quake;
