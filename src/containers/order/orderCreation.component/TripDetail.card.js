import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TripInfo from "./TripInfo.card";
import "./TripDetail.card.css";
import { findFlightListInLord, findFlightListInLordAgain } from "../../../actions/flight.action";
import { findQuoteInLord } from "../../../actions/quote.action";
class TripDetail extends Component {
  state = {
    round_trip: false,
    flight_token: "",
    flight_token_again: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleRoundTripButton = () => {
    this.setState(state => ({ round_trip: !state.round_trip }));
  };
  saveFlightToken = flight_token => {
    this.setState({ flight_token });
  };
  saveFlightTokenAgain = flight_token_again => {
    this.setState({ flight_token_again });
  };
  handleFindQuoteInLord = info => {
    console.log(info);
    this.props.findQuoteInLord({ ...info });
  };
  componentDidMount() {}
  render() {
    const {
      flight_list_in_lord,
      flight_list_in_lord_round,
      findFlightListInLord,
      findFlightListInLordAgain,
      quote_in_lord,
      quote_in_lord_again
    } = this.props;
    const { round_trip } = this.state;
    return (
      <div>
        <TripInfo
          quote_in_lord={quote_in_lord}
          findQuoteInLord={this.handleFindQuoteInLord}
          saveFlightToken={this.saveFlightToken}
          flight_list_in_lord={flight_list_in_lord}
          findFlightListInLord={findFlightListInLord}
        />
        {round_trip && (
          <TripInfo
            quote_in_lord={quote_in_lord_again}
            findQuoteInLord={this.handleFindQuoteInLord}
            saveFlightToken={this.saveFlightTokenAgain}
            flight_list_in_lord={flight_list_in_lord_round}
            findFlightListInLordAgain={findFlightListInLordAgain}
          />
        )}
        <div className="d-flex justify-content-between mt-5">
          <button
            className="btn trip-button-width rounded-custom bg-white text-purple shadow-sm hm-text-12"
            onClick={this.handleRoundTripButton}
          >
            {round_trip ? "Single Trip" : "Rounded Trip"}
          </button>
          <button className="btn trip-button-width rounded-custom text-white button-main-background shadow-sm hm-text-12">
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
const mapDispatchToProps = { findFlightListInLord, findFlightListInLordAgain, findQuoteInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
