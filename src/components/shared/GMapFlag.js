import React from "react";

class GMapFlag extends React.Component {
  state = {
    lat: "",
    lng: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (props.location_info.lat !== state.lat || props.location_info.lng !== state.lng) {
      return {
        lat: props.location_info.lat,
        lng: props.location_info.lng
      };
    }
    return null;
  }
  render() {
    return (
      <MapWithAMarkerWithLabel
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAP_API
        }&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={this.state.lat}
        lng={this.state.lng}
      />
    );
  }
}

export default GMapFlag;

const { compose } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require("react-google-maps");

const MapWithAMarkerWithLabel = compose(
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    defaultOptions={{
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#444444"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [
            {
              color: "#f2f2f2"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              saturation: -100
            },
            {
              lightness: 45
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              color: "#2569e3"
            },
            {
              visibility: "on"
            }
          ]
        }
      ]
    }}
  >
    {console.log(props)}
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));
