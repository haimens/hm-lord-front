import React, { Component } from "react";

class GMapWithMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelters: [],
      selectedMarker: false
    };
  }
  componentDidMount() {
    fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
      .then(r => r.json())
      .then(data => {
        this.setState({ shelters: data.shelters });
      });
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker });
  };
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
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

export default GMapWithMarker;

const { compose } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } = require("react-google-maps");

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 29.5, lng: -95 }}
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
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker);
        return (
          <Marker key={marker.id} onClick={onClick} position={{ lat: marker.latitude, lng: marker.longitude }}>
            {props.selectedMarker === marker && (
              <InfoWindow>
                <div>{"name"}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});
