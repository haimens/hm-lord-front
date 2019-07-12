import React, { Component } from "react";
import { GAutoComplete, GMapLocation } from "../../../components/shared";
import { TimePicker, DatePicker } from "antd";
import { convertLocalToUTC } from "../../../actions/utilities.action";
import TripCard from "./TripCar.card";
import alertify from "alertifyjs";
import FlightDetailModal from "./FlightDetail.modal";
class TripInfo extends Component {
  state = {
    name: "",
    cell: "",
    area: "",
    email: "",
    customer: "",
    airlineCode: "",
    flightNumber: "",
    date: "",
    time: "",
    blueCardBeenClicked: false,
    redCardBeenClicked: false,
    showFlightDetail: false
  };
  handleBlueCardBeenClicked = () => {
    this.setState(state => ({ blueCardBeenClicked: !state.blueCardBeenClicked, redCardBeenClicked: false }));
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleRedCardBeenClicked = () => {
    this.setState(state => ({ redCardBeenClicked: !state.redCardBeenClicked, blueCardBeenClicked: false }));
  };
  handleDatePicker = date => {
    this.setState({ date });
  };
  handleTimePicker = time => {
    this.setState({ time });
  };

  handleFlightDetailBeenClicked = async () => {
    await this.setState(state => ({ showFlightDetail: !state.showFlightDetail }));
  };

  saveFlightToken = flight_token => {
    this.props.saveFlightToken(flight_token);
  };
  handleSearchFlight = async () => {
    const { date, airlineCode, flightNumber } = this.state;
    if (date !== "" && airlineCode !== "" && flightNumber !== "") {
      await this.props.findFlightListInLord({ date: convertLocalToUTC(date), airlineCode, flightNumber });
      await this.handleFlightDetailBeenClicked();
    } else {
      alertify.alert("Error!", "Please Finished Date, Air Line Code, and Flight Number before search!");
    }
  };

  render() {
    const { airlineCode, flightNumber, blueCardBeenClicked, redCardBeenClicked, showFlightDetail } = this.state;
    const { flight_list_in_lord } = this.props;
    return (
      <div className="row pt-2 mb-4">
        {showFlightDetail && (
          <FlightDetailModal
            saveFlightToken={this.saveFlightToken}
            onClose={this.handleFlightDetailBeenClicked}
            flight_list_in_lord={flight_list_in_lord}
          />
        )}
        <div className="col-8">
          <div className="rounded-custom bg-white shadow-sm">
            <div className="d-flex justify-content-between align-items-center px-3 border-bottom-custom h-100">
              <h6
                className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold"
                style={{ height: "65px" }}
              >
                Trip Detail
              </h6>
            </div>
            <div className="p-3">
              <div className="form-group mb-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold my-4">Pickup Location</label>
                <GAutoComplete getGoogleAddress={this.saveToAddress} />
              </div>
              <div className="form-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Dropoff Location</label>
                <GAutoComplete getGoogleAddress={this.saveToAddress} />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Date</label>
                <DatePicker onChange={this.handleDatePicker} />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Time</label>
                <TimePicker onChange={this.handleTimePicker} />
              </div>
              <div className="form-group my-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold">Flight Number</label>
                <div className="input-group mt-2">
                  <input
                    type="text"
                    className="form-control hm-input-height col-2"
                    id="airlineCode"
                    placeholder="Airline Code"
                    value={airlineCode}
                    onChange={this.handleInputChange}
                  />

                  <input
                    type="text"
                    className="form-control hm-input-height "
                    id="flightNumber"
                    placeholder="Flight Number"
                    value={flightNumber}
                    onChange={this.handleInputChange}
                  />
                  <i
                    className="fas fa-search d-flex justify-content-center align-items-center button-main-background text-white hm-pointer-cursor"
                    style={{ height: "46px", width: "46px" }}
                    onClick={this.handleSearchFlight}
                  />
                </div>
              </div>

              <div className="form-group text-right py-3">
                <button
                  className="button-main-background btn button-main-size text-white"
                  style={{ width: "119px" }}
                  onClick={this.handleCreatingCompany}
                >
                  Get price
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="rounded-custom bg-white shadow-sm h-100">
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
              style={{ height: "65px" }}
            >
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                Select Vehicle Type
              </h6>
            </div>
            <div className="px-3 py-4">
              <div style={{ height: "161px" }}>
                <GMapLocation
                  position={{
                    center: {
                      lat: 0,
                      lng: 0
                    },
                    origin: {
                      lat: 0,
                      lng: 0
                    },
                    destination: {
                      lat: 0,
                      lng: 0
                    }
                  }}
                />
              </div>
            </div>

            <div className="px-3 py-4">
              <div className="mb-4">
                <TripCard
                  showPriceDetail={blueCardBeenClicked}
                  handleShowPriceDetail={this.handleBlueCardBeenClicked}
                  backgroundColor={`blue-background`}
                />
              </div>
              <div>
                <TripCard
                  showPriceDetail={redCardBeenClicked}
                  handleShowPriceDetail={this.handleRedCardBeenClicked}
                  backgroundColor={`red-background`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TripInfo;
