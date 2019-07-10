import React from "react";

export default function BasicInfo(props) {
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Basic Information</div>
          <button
            className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
            onClick={() => this.handleDetailButtonClicked("basic")}
          >
            <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
          </button>
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
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Vehicle Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Trip Amount</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Note</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Status</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">
          {true === 2 ? (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color font-weight-500">Active</div>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <i className="fas fa-circle text-danger mr-3" style={{ fontSize: "6px" }} />
              <div className="text-modal-color font-weight-500">Inactive</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
