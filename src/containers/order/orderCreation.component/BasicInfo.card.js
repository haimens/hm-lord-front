import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";
export default function BasicInfoCard(props) {
  const { showEditButton, basic_info, from_address_info, to_address_info, flight_info } = props;
  const { pickup_time } = basic_info;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Basic Information</div>
          {showEditButton && (
            <button className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center">
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
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
        <div className="hm-text-14 text-modal-color font-weight-bold">{"N/A"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Vehicle Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{basic_info.vehicle_type}</div>
      </div>
    </div>
  );
}
