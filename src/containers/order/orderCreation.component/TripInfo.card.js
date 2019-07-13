import React, { Component } from "react";
import { GAutoComplete, GMapLocation } from "../../../components/shared";
import { TimePicker, DatePicker } from "antd";
import { convertLocalToUTC } from "../../../actions/utilities.action";
import TripCard from "./TripCar.card";
import alertify from "alertifyjs";
import moment from "moment";
import FlightDetailModal from "./FlightDetail.modal";
import { inflate } from "zlib";
class TripInfo extends Component {
  state = {
    airlineCode: "",
    flightNumber: "",
    date: "",
    time: "",
    from_address: "",
    to_address: "",
    blueCardBeenClicked: false,
    redCardBeenClicked: false,
    showFlightDetail: false,
    currIndex: "",
    hasInputChanged: false,
    inputFrom: false,
    inputTo: false
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleDatePicker = date => {
    this.setState({ date });
  };
  handleTimePicker = time => {
    this.setState({ time });
  };
  saveFromAddress = address => {
    this.setState({ from_address: address[0].formatted_address });
  };
  saveToAddress = address => {
    this.setState({ to_address: address[0].formatted_address });
  };
  handleFindQuote = async () => {
    const { from_address, to_address, date, time } = this.state;
    if (date !== "" && time !== "") {
      if (from_address !== "" && to_address !== "") {
        let currDate = moment(date).format("YYYY/MM/DD");
        let currTime = moment(time).format("HH:mm:ss");
        let goodTime = moment(`${currDate} ${currTime}`);
        let inputFrom = document.getElementById("from").value;
        let inputTo = document.getElementById("to").value;
        await this.props.findQuoteInLord({
          from_address_str: inputFrom,
          to_address_str: inputTo,
          pickup_time: convertLocalToUTC(goodTime),
          pickup_time_local: moment(goodTime).format("YYYY-MM-DD HH:mm")
        });
        this.setState({ hasInputChanged: true });
      } else {
        alertify.alert("Error!", "Please Choose an Address From the Drop Down!");
      }
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };
  handleInputHasChanded = () => {
    this.setState({ hasInputChanged: false });
  };
  handleCardBeenClicked = async (currIndex, quote_token) => {
    await this.setState({ currIndex });
    await this.props.handleCarBeenClicked(quote_token);
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
    const { showFlightDetail, hasInputChanged } = this.state;
    const { airlineCode, flightNumber, flight_list_in_lord, quote_in_lord, handleInputChange } = this.props;
    const { basic_info, quote_list } = quote_in_lord;
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
                <GAutoComplete
                  handleInputHasChanded={this.handleInputHasChanded}
                  customeId={`from`}
                  getGoogleAddress={this.saveFromAddress}
                />
              </div>
              <div className="form-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Dropoff Location</label>
                <GAutoComplete
                  handleInputHasChanded={this.handleInputHasChanded}
                  customeId={`to`}
                  getGoogleAddress={this.saveToAddress}
                />
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
                    id={`${airlineCode}`}
                    placeholder="Airline Code"
                    value={airlineCode}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    className="form-control hm-input-height "
                    id={`${flightNumber}`}
                    placeholder="Flight Number"
                    value={flightNumber}
                    onChange={handleInputChange}
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
                  onClick={this.handleFindQuote}
                >
                  Get price
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="rounded-custom bg-white shadow-sm" style={{ height: "737px", overflow: "auto" }}>
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
              style={{ height: "65px" }}
            >
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                Select Vehicle Type
              </h6>
            </div>
            {hasInputChanged && basic_info !== "" && (
              <div className="px-3 py-4">
                <div style={{ height: "161px" }}>
                  <GMapLocation
                    position={{
                      center: {
                        lat: basic_info.from_lat,
                        lng: basic_info.from_lng
                      },
                      origin: {
                        lat: basic_info.from_lat,
                        lng: basic_info.from_lng
                      },
                      destination: {
                        lat: basic_info.to_lat,
                        lng: basic_info.to_lng
                      }
                    }}
                  />
                </div>
              </div>
            )}
            {hasInputChanged && basic_info === "" && (
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
            )}
            <div className="px-3 py-4">
              <div className="mb-4">
                {hasInputChanged &&
                  quote_list.length > 0 &&
                  quote_list.map((car, index) => (
                    <TripCard
                      showPriceDetail={this.state.currIndex === index}
                      handleCardBeenClicked={() => this.handleCardBeenClicked(index, car.quote_token)}
                      basic_info={basic_info}
                      quote_list={car}
                      handleShowPriceDetail={this.handleBlueCardBeenClicked}
                      backgroundColor={index % 2 === 0 ? `blue-background` : `red-background`}
                      key={index}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TripInfo;
