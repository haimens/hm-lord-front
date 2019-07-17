import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripInfo from "./TripDetail.component/TripInfo.card";
import "./TripDetail.card.css";
import { findFlightListInLord, findFlightListInLordAgain } from "../../../actions/flight.action";
import { createOrderInLord } from "../../../actions/order.action";
import {
  findQuoteInLord,
  findQuoteInLordAgain,
  setMapToFalse,
  setMapToFalseAgain
} from "../../../actions/quote.action";
import alertify from "alertifyjs";
class TripDetail extends Component {
  state = {
    flight_token: "",
    flight_token_again: "",
    quote_token: "",
    quote_token_again: "",
    flightNumber: "",
    airlineCode: "",
    flightNumberAgain: "",
    airlineCodeAgain: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleReviewTrip = async () => {
    const { currentCustomer, createOrderInLord, round_trip } = this.props;
    const {
      airlineCode,
      flightNumber,
      quote_token,
      airlineCodeAgain,
      flightNumberAgain,
      quote_token_again
    } = this.state;
    if (!round_trip) {
      if (quote_token !== "") {
        await createOrderInLord({
          customer_token: currentCustomer.customer_token,
          quote_list: [{ flight_str: `${airlineCode} ${flightNumber}`, quote_token }]
        });
        this.props.handleMoveNext(1);
      } else {
        alertify.alert("Error!", "Please select a car before moving on");
      }
    }

    if (round_trip) {
      if (quote_token !== "" && quote_token_again !== "") {
        await createOrderInLord({
          customer_token: currentCustomer.customer_token,
          quote_list: [
            { flight_str: `${airlineCode} ${flightNumber}`, quote_token },
            { flight_str: `${airlineCodeAgain} ${flightNumberAgain}`, quote_token: quote_token_again }
          ]
        });
        this.props.handleMoveNext(1);
      } else {
        alertify.alert("Error!", "Please select a car before moving on");
      }
    }
  };
  handleRoundTripButton = () => {
    this.props.handleRoundTrip();
  };
  saveFlightToken = flight_token => {
    this.setState({ flight_token });
  };
  saveFlightTokenAgain = flight_token_again => {
    this.setState({ flight_token_again });
  };
  handleFindQuoteInLord = info => {
    this.props.findQuoteInLord({ ...info });
  };
  handleFindQuoteInLordAgain = info => {
    this.props.findQuoteInLordAgain({ ...info });
  };
  handleCarBeenClicked = quote_token => {
    this.setState({ quote_token });
  };
  handleCarBeenClickedAgain = quote_token_again => {
    this.setState({ quote_token_again });
  };
  componentDidMount() {}
  render() {
    const { flightNumber, airlineCode, flightNumberAgain, airlineCodeAgain } = this.state;
    const {
      round_trip,
      flight_list_in_lord,
      flight_list_in_lord_round,
      quote_in_lord,
      quote_in_lord_again,
      setMapToFalse,
      setMapToFalseAgain,
      showMap,
      showMapAgain,
      currentCustomer,
      findFlightListInLord
    } = this.props;
    return (
      <div>
        <TripInfo
          findFlightListInLord={findFlightListInLord}
          currentCustomer={currentCustomer}
          round_trip={false}
          setMapToFalse={setMapToFalse}
          showMap={showMap}
          handleInputChange={this.handleInputChange}
          flightNumber={flightNumber}
          airlineCode={airlineCode}
          flightNumberID={"flightNumber"}
          airlineCodeID={"airlineCode"}
          quote_in_lord={quote_in_lord}
          findQuoteInLord={this.handleFindQuoteInLord}
          saveFlightToken={this.saveFlightToken}
          flight_list_in_lord={flight_list_in_lord}
          handleCarBeenClicked={this.handleCarBeenClicked}
        />
        {round_trip && (
          <TripInfo
            findFlightListInLord={findFlightListInLord}
            currentCustomer={currentCustomer}
            round_trip={true}
            setMapToFalse={setMapToFalseAgain}
            showMap={showMapAgain}
            handleInputChange={this.handleInputChange}
            flightNumber={flightNumberAgain}
            airlineCode={airlineCodeAgain}
            flightNumberID={"flightNumberAgain"}
            airlineCodeID={"airlineCodeAgain"}
            quote_in_lord={quote_in_lord_again}
            findQuoteInLord={this.handleFindQuoteInLordAgain}
            saveFlightToken={this.saveFlightTokenAgain}
            flight_list_in_lord={flight_list_in_lord}
            findFlightListInLordAgain={findFlightListInLordAgain}
            handleCarBeenClicked={this.handleCarBeenClickedAgain}
          />
        )}
        <div className="d-flex justify-content-between mt-5">
          <button
            className="btn trip-button-width rounded-custom bg-white text-purple shadow-sm hm-text-12"
            onClick={this.handleRoundTripButton}
          >
            {round_trip ? "Single Trip" : "Rounded Trip"}
          </button>
          <button
            className="btn trip-button-width rounded-custom text-white button-main-background shadow-sm hm-text-12"
            onClick={this.handleReviewTrip}
          >
            Next to review trip
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    flight_list_in_lord: state.flightReducer.flight_list_in_lord,
    flight_list_in_lord_round: state.flightReducer.flight_list_in_lord_round,
    quote_in_lord: state.quoteReducer.quote_in_lord,
    quote_in_lord_again: state.quoteReducer.quote_in_lord_again,
    showMap: state.quoteReducer.showMap,
    showMapAgain: state.quoteReducer.showMapAgain
  };
};
const mapDispatchToProps = {
  findQuoteInLord,
  findQuoteInLordAgain,
  createOrderInLord,
  setMapToFalse,
  setMapToFalseAgain,
  findFlightListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
