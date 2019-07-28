import React, { Component } from "react";
import { convertUTCtoLocal, parseAmount } from "../../../../actions/utilities.action";

export default class BasicInfo extends Component {
  state = {
    flight_str: ""
  };
  render() {
    const {
      showEditButton,
      basic_info,
      from_address_info,
      to_address_info,
      handleFlightButton,
      handleIconBeenClicked
    } = this.props;
    const { pickup_time } = basic_info;
    return (
      <div>
        <div className="purple-border p-3">
          <div className="d-flex justify-content-between align-items-center  ">
            <div className="hm-text-16 font-weight-bold text-modal-color">Basic Information</div>
            {showEditButton && (
              <img
                src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
                onClick={() => handleIconBeenClicked(basic_info.trip_token, basic_info.flight_str)}
                alt="Edit"
              />
            )}
          </div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Pickup Date/Time</div>
          <div className="hm-text-14 text-modal-color font-weight-bold">{convertUTCtoLocal(pickup_time)}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Pickup Location</div>
          <div className="hm-text-14 text-modal-color font-weight-bold">{from_address_info.addr_str}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Dropoff Location</div>
          <div className="hm-text-14 text-modal-color font-weight-bold">{to_address_info.addr_str}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Flight Information</div>
          <div className="hm-text-14 text-modal-color font-weight-bold mt-1">
            <button
              style={{
                width: "88px",
                height: "28px",
                borderRadius: "5px",
                border: "solid 1px #32325d"
              }}
              onClick={() => handleFlightButton()}
              className="bg-white text-modal-color font-weight-bold"
            >
              {basic_info.flight_str !== " " ? basic_info.flight_str : "N/A"}
            </button>
          </div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Vehicle Type</div>
          <div className="hm-text-14 text-modal-color font-weight-bold">{basic_info.vehicle_type}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Trip Total</div>
          <div className="hm-text-14 text-modal-color font-weight-bold">{parseAmount(basic_info.amount, 2)}</div>
        </div>
      </div>
    );
  }
}
