import React from "react";

export default function CustomerInfo(props) {
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Time Stamps</div>
          <button
            className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
            onClick={() => this.handleDetailButtonClicked("basic")}
          >
            <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
          </button>
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Start Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Arrive Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">COB Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">CAD Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div>
    </div>
  );
}
