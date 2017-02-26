import React, { Component } from 'react';

class Quake extends Component {
  render() {
      return (
        <p>{this.props.details.properties.title}</p>
      );
    }
  }

export default Quake;
