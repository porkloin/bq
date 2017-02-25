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

  render() {
    return (
      <Map onClick={this.mapTest} center={position} zoom={1} >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={this.props.quakes}
          map={this} />
        <Marker position={position}>
                <Popup>
                          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default QuakeMap;
