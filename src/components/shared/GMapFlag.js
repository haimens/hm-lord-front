import React from "react";

class GMapFlag extends React.Component {
  render() {
    return (
      <MapWithAMarkerWithLabel
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAP_API
        }&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
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
    defaultCenter={{ lat: 34.1080263, lng: -117.742504 }}
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
    <Marker position={{ lat: 34.1080263, lng: -117.742504 }} />
  </GoogleMap>
));
