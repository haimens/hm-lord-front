import React from "react";

export default function BasicInfo(props) {
  return (
    <>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Basic Information</div>

          <button
            className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
            onClick={() => props.handleUpdateBasicInfo()}
          >
            <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
          </button>
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Order ID</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Order Placed Time</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Order Total Amount</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{"N/A"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Note</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Status</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">
          {false === "DISPATCHED" ? (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">DISPATCHED</div>
            </div>
          ) : false === "ON-THE-WAY" ? (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle pending-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">ON-THE-WAY</div>
            </div>
          ) : (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle text-purple mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">{123}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
