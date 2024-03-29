import React, { Component } from 'react';
import Leaflet from 'leaflet';
import { Map, GeoJSON, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './QuakeMap.css';

delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const position = [51.505, -120.09];

class QuakeMap extends Component {
  constructor(){
    super();
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    //    this.onEachFeature = this.onEachFeature.bind(this);
  }
  componentWillReceiveProps(prevProps) {
    if (prevProps.data !== this.props.data) {
      console.log('will receive props');
      this.refs.geojsonLayer.leafletElement.clearLayers();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      console.log('component did update');
      this.refs.geojsonLayer.leafletElement.addData(this.props.data);
      var pointCoord = this.props.data.features[0].geometry.coordinates;
      this.refs.map.leafletElement.flyTo([pointCoord[1], pointCoord[0]]);
    }
    if (prevProps.liveQuakeId !== this.props.liveQuakeId) {
      pointCoord = this.props.data.features[this.props.liveQuakeId].geometry.coordinates;
      this.refs.map.leafletElement.flyTo([pointCoord[1], pointCoord[0]]);
    }
    if (prevProps.mapZoom !== this.props.mapZoom) {
      this.refs.map.leafletElement.setView(this.props.mapCenter, this.props.mapZoom);
      this.refs.map.leafletElement.invalidateSize();
      console.log(this.refs.map.leafletElement);
      console.log(this.props.mapZoom + " " + this.props.mapCenter);
    }
  }
  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
      console.log('onEach feature triggering');
      console.log(feature);
      console.log(layer);
      return layer.bindPopup(feature.properties.name);
    }
  }
  pointToLayer(feature, latlng) {
  // renders our GeoJSON points as circle markers, rather than Leaflet's default image markers
  // parameters to style the GeoJSON markers
    var markerParams = {
      radius: 7,
      fillColor: 'orange',
      color: '#fff',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.8
    };
    return Leaflet.circleMarker(latlng, markerParams);
  }
  render() {
    return (
      <Map ref="map" className={this.props.quakeClass} attributionControl={false} userFlyTo={true} center={this.props.mapCenter} zoom={this.props.mapZoom} zoomControl={false} scrollWheelZoom={false} dragging={false} doubleClickZoom={false} boxZoom={false} worldCopyJump={true} >
        <TileLayer
          url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
          attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
        />
        <GeoJSON
          key={this.props.data}
          ref="geojsonLayer"
          data={this.props.data}
          pointToLayer={this.pointToLayer}
          onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.title)}
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
