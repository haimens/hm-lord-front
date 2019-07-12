import React, { Component } from "react";
import { GAutoComplete, GMapLocation } from "../../../components/shared";
import { TimePicker, DatePicker } from "antd";
import TripCard from "./TripCar.card";
export default class TripInfo extends Component {
  state = {
    name: "",
    cell: "",
    area: "",
    email: "",
    customer: "",
    blueCardBeenClicked: false,
    redCardBeenClicked: false
  };
  handleBlueCardBeenClicked = () => {
    this.setState(state => ({ blueCardBeenClicked: !state.blueCardBeenClicked, redCardBeenClicked: false }));
  };

  handleRedCardBeenClicked = () => {
    this.setState(state => ({ redCardBeenClicked: !state.redCardBeenClicked, blueCardBeenClicked: false }));
  };
  render() {
    const { name, blueCardBeenClicked, redCardBeenClicked } = this.state;

    return (
      <div className="row pt-2 mb-4">
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
                <DatePicker onChange={this.handleCADTime} />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-4">Time</label>
                <TimePicker onChange={this.handleCADTime} />
              </div>
              <div className="form-group my-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold">Flight Number</label>
                <div className="input-group mt-2">
                  <input
                    className="form-control hm-input-height"
                    name="name"
                    id="name"
                    placeholder={"Name"}
                    value={name}
                    onChange={this.handleInputChange}
                  />
                  <i
                    className="fas fa-search d-flex justify-content-center align-items-center button-main-background text-white hm-pointer-cursor"
                    style={{ height: "46px", width: "46px" }}
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
