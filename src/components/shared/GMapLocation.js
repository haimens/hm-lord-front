import React, { Component } from "react";

class GMapLocation extends Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      directions: "null",
      position: ""
    };
  }

  async componentDidMount() {
    console.log(this.props);
    await this.setState({ position: this.props.position });
  }

  render() {
    return <MapWithADirectionsRenderer driver_info={this.props.driver_info} position={this.state.position} />;
  }
}

const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAP_API
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(this.props.position.origin.lat, this.props.position.origin.lng),
          destination: new window.google.maps.LatLng(
            this.props.position.destination.lat,
            this.props.position.destination.lng
          ),
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={new window.google.maps.LatLng(props.position.center.lat, props.position.center.lng)}
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
    {props.directions && (
      <div>
        <DirectionsRenderer directions={props.directions} />
        {props.driver_info && (
          <Marker
            icon={{
              url: props.driver_info.img_path,
              scaledSize: new window.google.maps.Size(30, 30)
            }}
            position={{ lat: props.driver_info.lat, lng: props.driver_info.lng }}
          >
            <InfoWindow>
              <div className="d-flex justify-content-center align-items-center">
                <img src={props.driver_info.img_path} style={{ width: "30px", height: "30px" }} alt="driver" />
                <div className="ml-2 text-modal-color">{props.driver_info.name}</div>
              </div>
            </InfoWindow>
          </Marker>
        )}
      </div>
    )}
  </GoogleMap>
));

export default GMapLocation;
