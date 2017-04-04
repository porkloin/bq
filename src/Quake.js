import React, { Component } from 'react';
import './fontawesome/css/font-awesome.min.css';
import FontAwesome from 'react-fontawesome';
import './Quake.css';

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
        <div className="quake">
        <p className={this.props.active} onClick={ () => this.handleClick(this.props.index) }>{Number(this.props.index) + 1} - {this.props.details.properties.title}</p>
        <a href={this.props.details.properties.url} target="_blank"><FontAwesome className="blue" name="info-circle" size='1x' /></a>
        </div>
      );
    }
  }

export default Quake;
