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
import { findCustomerDetailInLord } from "../../../actions/customer.action";
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
  componentDidMount() {
    const { currentCustomer, findCustomerDetailInLord } = this.props;
    if (currentCustomer.customer_token) {
      findCustomerDetailInLord(currentCustomer.customer_token);
    }
  }
  render() {
    const { flightNumber, airlineCode, flightNumberAgain, airlineCodeAgain } = this.state;
    const {
      round_trip,
      flight_list_in_lord,
      quote_in_lord,
      quote_in_lord_again,
      setMapToFalse,
      setMapToFalseAgain,
      showMap,
      showMapAgain,
      currentCustomer,
      findFlightListInLord,
      customer_detail_in_lord
    } = this.props;
    return (
      <div>
        <div className="row pt-2 mb-4">
          <div className="col-12 ">
            <div className="rounded-custom bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center px-3 border-bottom-custom h-100">
                <h6
                  className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold"
                  style={{ height: "65px" }}
                >
                  Customer Information
                </h6>
              </div>
              <div />
              <div className="bg-white rounded-custom shadow-sm">
                <div className="row" style={{ padding: "40px" }}>
                  <div className="col-lg-2 col-12 mb-4 d-flex justify-content-center">
                    <img
                      className="rounded-circle"
                      style={{ height: "90px", width: "90px" }}
                      src={customer_detail_in_lord.img_path}
                      alt="avatar"
                    />
                  </div>
                  <div className="col-lg-8 col-12">
                    <div className="row text-modal-color">
                      <div className="col-12 mb-4">
                        <div className="row">
                          <div className="mb-4 col-6">
                            <div className="text-secondary-color font-weight-500 hm-text-14">Name</div>
                            <div className="hm-text-14 font-weight-bold">{customer_detail_in_lord.name}</div>
                          </div>
                          <div className="mb-4 col-6">
                            <div className="text-secondary-color font-weight-500 hm-text-14">Username</div>
                            <div className="hm-text-14 font-weight-bold">{customer_detail_in_lord.username}</div>
                          </div>
                          <div className="mb-4 col-6">
                            <div className="text-secondary-color font-weight-500 hm-text-14">Cell</div>
                            <div className="hm-text-14 font-weight-bold">{customer_detail_in_lord.cell}</div>
                          </div>
                          <div className="mb-4 col-6">
                            <div className="text-secondary-color font-weight-500 hm-text-14">Address</div>
                            <div className="hm-text-14 font-weight-bold">{customer_detail_in_lord.addr_str}</div>
                          </div>
                          <div className="mb-4 col-6">
                            <div className="text-secondary-color font-weight-500 hm-text-14">Email</div>
                            <div className="hm-text-14 font-weight-bold">{customer_detail_in_lord.email}</div>
                          </div>
                          <div className="mb-4 col-6">
                            <div className="text-secondary-color font-weight-500 hm-text-14">Special Note</div>
                            <div className="hm-text-14 font-weight-bold">
                              {customer_detail_in_lord.note ? customer_detail_in_lord.note : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    showMapAgain: state.quoteReducer.showMapAgain,
    customer_detail_in_lord: state.customerReducer.customer_detail_in_lord
  };
};
const mapDispatchToProps = {
  findQuoteInLord,
  findQuoteInLordAgain,
  createOrderInLord,
  setMapToFalse,
  setMapToFalseAgain,
  findFlightListInLord,
  findCustomerDetailInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
