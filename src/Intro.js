import React, { Component } from 'react';
import './Intro.css';

class Intro extends Component {
  render() {
    return(
      <div className={"intro " + this.props.isVisible}>
        <p>
          <span className="tiny">Discover your</span><br />
          <span className="bq">BIRTH<span className="blue">QUAKE</span></span><br />
          <span className="tiny">the most powerful earthquake on the day of your birth</span>
        </p>
      </div>
    )
  }
}

export default Intro
