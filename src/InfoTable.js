import React, { Component } from 'react';
import './fontawesome/css/font-awesome.min.css';
import FontAwesome from 'react-fontawesome';
import './InfoTable.css';
class InfoTable extends Component {
  render() {
    return(
      <table cellSpacing="0" cellPadding="5" className="infoTable">
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td className="right"><FontAwesome name="times" size="1x" onClick={this.props.modalToggle} text-align="right" /></td>
          </tr>
          <tr className="header">
            <th>Magnitude</th>
            <th>Earthquake Effects</th>
            <th>Estimated Number Each Year</th>
          </tr>
          <tr className="stripe">
            <td>2.5 or less</td>
            <td>Usually not felt, but can be recorded by seismograph</td>
            <td>2,000,000+</td>
          </tr>
          <tr>
            <td>2.5-5.4</td>
            <td>Often felt, but only causes minor damage</td>
            <td>500,000</td>
          </tr>
          <tr className="stripe">
            <td>5.5-6.0</td>
            <td>Slight damage to buildings and other structures</td>
            <td>500</td>
          </tr>
          <tr>
            <td>6.1-6.9</td>
            <td>May cause a lot of damage in very populated areas</td>
            <td>100</td>
          </tr>
          <tr className="stripe">
            <td>7.0-7.9</td>
            <td>Major earthquake. Serious damage</td>
            <td>20</td>
          </tr>
          <tr>
            <td>8.0 or greater</td>
            <td>Great earthquake. Can destroy communities near epicenter.</td>
            <td>~1</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default InfoTable;
