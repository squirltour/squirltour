import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import authKeys from '../../server/oauth-config/auth-keys.js';

const mapStyles = {
  width: '100%',
  height: '300px'
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
  };


  displayMarkers () {
    return this.props.searchResults.map((props, index) => {
      console.log(props.lat);
      return <Marker key={index} id={index} position={{
        lat: props.lat,
        lng: props.long
      } }/>
    });
  };

  render() {

    const markersArr = this.displayMarkers();

    console.log(markersArr);
    return (
      <div id='map-wrap'>
      <Map
      google={this.props.google}
      zoom={10}
      style={mapStyles}
      initialCenter={{ lat: this.props.lat, lng: this.props.long }}
      >
        {markersArr}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${authKeys.googleMapsAPI.key}`
})(MapContainer);