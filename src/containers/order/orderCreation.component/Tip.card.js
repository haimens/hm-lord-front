import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";
export default function TipCard(props) {
  const { showEditButton } = props;
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
        <div className="text-secondary-color font-weight-500 hm-text-14">Pickup Time</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">From</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">To</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Flight Information</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{"N/A"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Vehicle Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{12}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Trip Amount</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{parseAmount(12)}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Note</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{"N/A"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{"N/A"}</div>
      </div>
    </div>
  );
}
