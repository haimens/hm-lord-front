import React, { Component } from "react";
import { GAutoComplete, GMapLocation, FlightDetailModal } from "../../../../components/shared";
import { TimePicker, DatePicker } from "antd";
import { convertLocalToUTC } from "../../../../actions/utilities.action";
import TripCard from "./TripCar.card";
import alertify from "alertifyjs";
import moment from "moment";
class TripInfo extends Component {
  state = {
    airlineCode: "",
    flightNumber: "",
    date: moment(),
    time: moment().add(8, "hours"),
    from_address: "",
    to_address: "",
    blueCardBeenClicked: false,
    redCardBeenClicked: false,
    showFlightDetail: false,
    currIndex: "",
    inputFrom: false,
    inputTo: false,
    pickup_location: "",
    dropoff_location: ""
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
    if (this.props.getFromAddress) {
      let inputFrom = document.getElementById("from").value;
      this.props.getFromAddress(inputFrom);
    }
  };
  saveToAddress = address => {
    this.setState({ to_address: address[0].formatted_address });
    if (this.props.getToAddress) {
      let inputFrom = document.getElementById("to").value;
      this.props.getToAddress(inputFrom);
    }
  };

  handlePastAddressToPickUp = () => {
    this.setState({
      pickup_location: this.props.currentCustomer.addr_str,
      from_address: this.props.currentCustomer.addr_str
    });
    if (this.props.getFromAddress) {
      let inputFrom = this.props.currentCustomer.addr_str;
      this.props.getFromAddress(inputFrom);
    }
  };

  handlePastAddressToDropOff = () => {
    this.setState({
      dropoff_location: this.props.currentCustomer.addr_str,
      to_address: this.props.currentCustomer.addr_str
    });
    if (this.props.getToAddress) {
      let inputFrom = this.props.currentCustomer.addr_str;
      this.props.getToAddress(inputFrom);
    }
  };
  handleFlightDetailBeenClicked = async () => {
    await this.setState(state => ({ showFlightDetail: !state.showFlightDetail }));
  };

  handleSearchFlight = async () => {
    const { date, time } = this.state;
    const { airlineCode, flightNumber, findFlightListInLord } = this.props;
    if (date !== "" && airlineCode !== "" && flightNumber !== "") {
      await findFlightListInLord({
        date: convertLocalToUTC(`${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm:ss")}`),
        airlineCode,
        flightNumber
      });
      await this.handleFlightDetailBeenClicked();
    } else {
      alertify.alert("Error!", "Please Finished Date, Air Line Code, and Flight Number before search!");
    }
  };

  handleFindQuote = async () => {
    const { from_address, to_address, date, time } = this.state;
    const { round_trip } = this.props;
    if (!round_trip) {
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
        } else {
          alertify.alert("Error!", "Please Choose an Address From the Drop Down!");
        }
      } else {
        alertify.alert("Error!", "Please Finish The Form!");
      }
    }
    if (round_trip) {
      if (date !== "" && time !== "") {
        if (from_address !== "" && to_address !== "") {
          let currDate = moment(date).format("YYYY/MM/DD");
          let currTime = moment(time).format("HH:mm:ss");
          let goodTime = moment(`${currDate} ${currTime}`);
          let inputFrom = document.getElementById("from_again").value;
          let inputTo = document.getElementById("to_again").value;
          await this.props.findQuoteInLord({
            from_address_str: inputFrom,
            to_address_str: inputTo,
            pickup_time: convertLocalToUTC(goodTime),
            pickup_time_local: moment(goodTime).format("YYYY-MM-DD HH:mm")
          });
        } else {
          alertify.alert("Error!", "Please Choose an Address From the Drop Down!");
        }
      } else {
        alertify.alert("Error!", "Please Finish The Form!");
      }
    }
  };

  disabledDate = current => {
    // Can not select days before today and today
    return current && current.valueOf() <= moment().subtract(1, "days");
  };

  handleInputHasChanged = async () => {
    await this.props.setMapToFalse();
    await this.setState({ currIndex: "" });
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

  componentDidMount() {
    const { to_address, from_address } = this.props;
    if (from_address) {
      this.setState({ pickup_location: to_address, from_address });
    }
    if (to_address) {
      this.setState({ dropoff_location: from_address, to_address });
    }
  }

  render() {
    const { pickup_location, dropoff_location, showFlightDetail } = this.state;
    const {
      airlineCode,
      flightNumber,
      quote_in_lord,
      handleInputChange,
      showMap,
      round_trip,
      flightNumberID,
      airlineCodeID,
      flight_list_in_lord
    } = this.props;
    const { basic_info, quote_list } = quote_in_lord;
    return (
      <div className="row pt-2 mb-4">
        {showFlightDetail && (
          <FlightDetailModal
            hideButton={true}
            saveFlightToken={this.saveFlightToken}
            onClose={this.handleFlightDetailBeenClicked}
            flight_list_in_lord={flight_list_in_lord}
          />
        )}
        <div className="col-12 col-lg-8 mb-4">
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
                <div className="d-flex">
                  <GAutoComplete
                    handleInputHasChanged={this.handleInputHasChanged}
                    customeId={!round_trip ? `from` : `from_again`}
                    getGoogleAddress={this.saveFromAddress}
                    defaultValue={pickup_location}
                  />

                  <img
                    src={`${process.env.PUBLIC_URL}/img/btn_paste.svg`}
                    onClick={this.handlePastAddressToPickUp}
                    alt="paste"
                    className="ml-2 hm-pointer-cursor"
                  />
                </div>
              </div>
              <div className="form-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Dropoff Location</label>
                <div className="d-flex">
                  <GAutoComplete
                    handleInputHasChanged={this.handleInputHasChanged}
                    customeId={!round_trip ? `to` : `to_again`}
                    getGoogleAddress={this.saveToAddress}
                    defaultValue={dropoff_location}
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/img/btn_paste.svg`}
                    onClick={this.handlePastAddressToDropOff}
                    alt="paste"
                    className="ml-2 hm-pointer-cursor"
                  />
                </div>
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Date</label>
                <DatePicker defaultValue={moment()} disabledDate={this.disabledDate} onChange={this.handleDatePicker} />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Time</label>
                <TimePicker defaultValue={moment().add(8, "hours")} format={"HH:mm"} onChange={this.handleTimePicker} />
              </div>
              <div className="form-group my-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold">
                  Flight Number
                  <div className="btn-group dropup">
                    <button
                      type="button"
                      className="dropdown-toggle removeAfter"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ border: "none", outline: "none" }}
                    >
                      <i className="far fa-question-circle" style={{ fontSize: "16px", color: "#aeb5bd" }} />
                    </button>
                    <div
                      className="dropdown-menu hm-main-text-12 border-0 shadow hm-main-textColor-sub p-3 triangle-bottom"
                      style={{ width: "260px" }}
                    >
                      Airline code is the operating airline code, ex. UA. Flight number refers to the numeric part of a
                      flight code. If you are not sure,
                      <a
                        className="hm-main-text-12"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.iata.org/publications/Pages/code-search.aspx"
                      >
                        search here.
                      </a>
                    </div>
                  </div>
                </label>
                <div className="input-group mt-2">
                  <input
                    type="text"
                    className="form-control hm-input-height col-6 mr-3"
                    id={airlineCodeID}
                    placeholder="Airline Code"
                    value={airlineCode}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control hm-input-height col-6 ml-3 col "
                    id={flightNumberID}
                    placeholder="Flight Number"
                    value={flightNumber}
                    onChange={handleInputChange}
                  />

                  <i
                    className="fas fa-search d-flex justify-content-center align-items-center rounded-circle button-main-background text-white hm-pointer-cursor ml-3"
                    style={{ height: "46px", width: "46px" }}
                    onClick={this.handleSearchFlight}
                  />
                </div>
              </div>

              <div className="form-group text-right py-3 d-flex justify-content-end ">
                <div
                  className="tip-card rounded-custom hm-pointer-cursor"
                  style={{ width: "119px" }}
                  onClick={this.handleFindQuote}
                >
                  <img src={`${process.env.PUBLIC_URL}/img/icon_price.svg`} alt="error404" />
                  <button className=" btn button-main-size text-white">Get price</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 h-100">
          <div className="rounded-custom bg-white shadow-sm" style={{ height: "753px", overflow: "auto" }}>
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
              style={{ height: "65px" }}
            >
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                Select Vehicle Type
              </h6>
            </div>
            {showMap && basic_info !== "" && (
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
            {showMap && basic_info === "" && (
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
                {showMap &&
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
