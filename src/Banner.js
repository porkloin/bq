import React, { Component } from 'react';
import './Banner.css';
import './fontawesome/css/font-awesome.min.css';
import FontAwesome from 'react-fontawesome';
import Textarea from 'react-textarea-autosize';

class Banner extends Component {
  render() {
    return(
      <div className="ribbonArea">
        <div className="ribbon">
          <strong className="ribbon-content">
            <Textarea name="name" placeholder="Enter Your Name!" onChange={this.props.handleNameInput}></Textarea>
          </strong>
        </div>
        <h1>This is your Birthquake!</h1>
        <div className="icons">
          <a href={"http://www.facebook.com/sharer.php?u=http://www.earthscope.com&title=Birthquake&description=Find the biggest Earthquake on the date of your birth!&quote=My Birthquake was " + this.props.topQuake + " on " + this.props.selectedDate + ". What's yours?"}><FontAwesome name="facebook-official" /></a>
      <a href={"http://twitter.com/share?text=My Birthquake was " + this.props.topQuake + " on " + this.props.selectedDate + ". Find yours at &url=http://www.earthscope.org/birthquake&hashtags=earthscope,birthquake"}><FontAwesome name="twitter" /></a>
          <FontAwesome onClick={this.props.printViewToggle} name="print" />
          <FontAwesome className="heartOverride" name="heartbeat" onClick={this.props.modalToggle} />
        </div>
        <div className="upperDate">
          <h1>{this.props.selectedDate}</h1>
        </div>

      </div>
    )
  }
}

export default Banner;
