import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripInfo from "./TripInfo.card";
import "./TripDetail.card.css";
import { findFlightListInLord, findFlightListInLordAgain } from "../../../actions/flight.action";
import { createOrderInLord } from "../../../actions/order.action";
import { findQuoteInLord } from "../../../actions/quote.action";
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
  handleReviewTrip = () => {
    const { currentCustomer, createOrderInLord } = this.props;
    const { airlineCode, flightNumber, quote_token } = this.state;
    createOrderInLord({
      customer_token: currentCustomer.customer_token,
      quote_list: [{ flight_str: `${airlineCode}${flightNumber}`, quote_token }]
    });
    this.props.handleMoveNext(1);
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
      flight_list_in_lord,
      flight_list_in_lord_round,
      findFlightListInLord,
      findFlightListInLordAgain,
      quote_in_lord,
      quote_in_lord_again,
      round_trip
    } = this.props;
    return (
      <div>
        <TripInfo
          handleInputChange={this.handleInputChange}
          flightNumber={flightNumber}
          airlineCode={airlineCode}
          quote_in_lord={quote_in_lord}
          findQuoteInLord={this.handleFindQuoteInLord}
          saveFlightToken={this.saveFlightToken}
          flight_list_in_lord={flight_list_in_lord}
          findFlightListInLord={findFlightListInLord}
          handleCarBeenClicked={this.handleCarBeenClicked}
        />
        {round_trip && (
          <TripInfo
            handleInputChange={this.handleInputChange}
            flightNumber={flightNumberAgain}
            airlineCode={airlineCodeAgain}
            quote_in_lord={quote_in_lord_again}
            findQuoteInLord={this.handleFindQuoteInLord}
            saveFlightToken={this.saveFlightTokenAgain}
            flight_list_in_lord={flight_list_in_lord_round}
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
    quote_in_lord_again: state.quoteReducer.quote_in_lord_again
  };
};
const mapDispatchToProps = { findFlightListInLord, findFlightListInLordAgain, findQuoteInLord, createOrderInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
