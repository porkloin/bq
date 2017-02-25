import React, { Component } from 'react';
import Leaflet from 'leaflet';
import { Map, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './QuakeMap.css';

delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const position = [51.505, -0.09];

class QuakeMap extends Component {
  constructor(){
    super();
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentWillReceiveProps(prevProps) {
    if (prevProps.data !== this.props.data) {
      console.log('will receive props');
      this.refs.geojsonLayer.leafletElement.clearLayers();
      //console.log(this.refs.map.leafletElement.clearLayers);
      //this.refs.map.leafletElement.clearLayers();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      console.log('component did update');
      this.refs.geojsonLayer.leafletElement.addData(this.props.data);
      //this.refs.map.leafletElement.addData(this.props.data);
    }
  }
  render() {
    return (
      <Map ref="map" onClick={this.mapTest} center={position} zoom={3} >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          ref="geojsonLayer"
          key={this.props.data}
          data={this.props.data}
          map={this} />
      </Map>
    );
  }
}
  /*
QuakeMap.propTypes = {
  data: React.PropTypes.object.isRequired
};
*/
export default QuakeMap;
