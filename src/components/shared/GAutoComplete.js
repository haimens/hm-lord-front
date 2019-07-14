import React, { Component } from "react";
import { connect } from "react-redux";
import "./GAutoComplete.css";
class GAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAddress: null
    };
  }

  _getAddress = address => {
    this.props.getGoogleAddress(address);
  };

  handleInputChange = () => {
    this.props.handleInputHasChanged();
  };

  render() {
    return (
      <PlacesWithStandaloneSearchBox
        _getAddress={this._getAddress}
        defaultValue={this.props.defaultValue}
        inputClass={this.props.inputClass}
        customeId={this.props.customeId}
        inputOnClick={this.handleInputChange}
      />
    );
  }
}

export default connect(null)(GAutoComplete);

const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs } = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAP_API
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.setState({
            places
          });
        }
      });
    }
  }),
  withScriptjs
)(props => (
  <>
    {props.places[0] && props._getAddress(props.places)}
    <StandaloneSearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} onPlacesChanged={props.onPlacesChanged}>
      <div className="input-group ">
        <input
          className={`form-control  ${props.inputClass} hm-input-height `}
          id={props.customeId}
          onClick={props.inputOnClick}
          type="text"
          placeholder={"Address"}
          defaultValue={props.defaultValue}
        />
      </div>
    </StandaloneSearchBox>
  </>
));
