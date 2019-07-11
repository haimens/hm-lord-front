import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GAutoComplete, GMapLocation } from "../../../components/shared";
import { TimePicker, DatePicker } from "antd";
import "./TripDetail.card.css";
class TripDetail extends Component {
  state = {
    name: "",
    cell: "",
    area: "",
    email: "",
    customer: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  componentDidMount() {}
  render() {
    const { name, cell, area, email, customer } = this.state;
    const { customer_list_in_lord } = this.props;
    return (
      <div className="row pt-2">
        <div className="col-8">
          <div className="rounded-custom bg-white shadow-sm">
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom-custom h-100">
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
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
              <div className="px-4 py-3 shadow-sm rounded-custom text-white d-flex justify-content-between align-items-center blue-background">
                <div className="d-flex align-items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/hd.png`}
                    style={{ width: "48px", height: "48px" }}
                    alt="company"
                    className="rounded-circle"
                  />
                  <div className="ml-3 hm-text-15 font-weight-bold">Sedan</div>
                </div>
                <div className="ml-3 hm-text-15 font-weight-bold">0.00</div>
              </div>
            </div>

            <div className="px-3 pb-4">
              <div className="px-4 py-3 shadow-sm rounded-custom text-white d-flex justify-content-between align-items-center red-background">
                <div className="d-flex align-items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/hd.png`}
                    style={{ width: "48px", height: "48px" }}
                    alt="company"
                    className="rounded-circle"
                  />
                  <div className="ml-3 hm-text-15 font-weight-bold">Sedan</div>
                </div>
                <div className="ml-3 hm-text-15 font-weight-bold">0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetail));
