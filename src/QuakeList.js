import React, { Component } from 'react';
import Quake from './Quake';
import './QuakeList.css';

class QuakeList extends Component {
  render() {
      return (
        <div className="QuakeList">
          <h2>A list of quakes</h2>
            {
              Object
                .keys(this.props.data.features)
                .map(key => <Quake key={key} details={this.props.data.features[key]} />)
            }
        </div>
      );
    }
  }

export default QuakeList;
