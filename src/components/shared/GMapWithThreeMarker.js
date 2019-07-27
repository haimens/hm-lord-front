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
    const { from_address_info, to_address_info, driver_detail_in_lord } = this.props;
    console.log(driver_detail_in_lord);
    let position = [
      { lat: from_address_info.lat, lng: from_address_info.lng },
      { lat: to_address_info.lat, lng: to_address_info.lng }
    ];

    if (driver_detail_in_lord && driver_detail_in_lord.location_info) {
      position.unshift({
        lat: driver_detail_in_lord.location_info.lat,
        lng: driver_detail_in_lord.location_info.lng,
        name: driver_detail_in_lord.basic_info.name
      });
    }
    console.log(position);
    this.setState({ shelters: position });
  }
  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker });
  };
  render() {
    return (
      <MapWithAMarker
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
      defaultCenter={{ lat: props.markers[0].lat, lng: props.markers[0].lng }}
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
                color: "#5e72e4"
              },
              {
                visibility: "on"
              }
            ]
          }
        ]
      }}
    >
      {props.markers.map((marker, index) => {
        props.onClick.bind(this, marker);
        return (
          <Marker
            key={index}
            icon={{
              url: marker.img_path,
              scaledSize: new window.google.maps.Size(30, 30)
            }}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {marker.name && (
              <InfoWindow>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="ml-2 text-modal-color">{marker.name}</div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});
