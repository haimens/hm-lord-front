import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GAutoComplete } from "../../../components/shared";
import { TimePicker, DatePicker } from "antd";
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
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
              style={{ height: "65px" }}
            >
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                Trip Detail
              </h6>
            </div>
            <div className="p-3">
              <div className="form-group mb-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold mb-2">Pickup Location</label>
                <GAutoComplete getGoogleAddress={this.saveToAddress} />
              </div>
              <div className="form-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-2">Dropoff Location</label>
                <GAutoComplete getGoogleAddress={this.saveToAddress} />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-2">Date</label>
                <DatePicker onChange={this.handleCADTime} />
              </div>
              <div className="form-group input-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold mb-2">Time</label>
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
                  <i className="fas fa-search d-flex justify-content-center align-items-center button-main-background text-white hm-pointer-cursor" 
                  style={{ height: "46px", width: "46px" }} />
                </div>
              </div>

              <div className="form-group text-right py-3">
                <button
                  className="button-main-background btn button-main-size text-white" style={{width:"119px"}}
                  onClick={this.handleCreatingCompany}
                >
                  Get price
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="rounded-custom bg-white shadow-sm">
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
              style={{ height: "65px" }}
            >
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                Select Vehicle Type
              </h6>
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
