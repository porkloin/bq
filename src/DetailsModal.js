import React, { Component } from 'react';
import './DetailsModal.css';
import moment from 'moment';

class DetailsModal extends Component {
  render() {
    return(
      <div className="detailsModal">
        <h2>Details:</h2>
        <p>{this.props.title}</p>
        <p>{this.props.mag}</p>
        <p>{moment(this.props.time).format('LT')}</p>
        <a href={this.props.link}>Link</a>
      </div>
    );
  }
}

export default DetailsModal;
