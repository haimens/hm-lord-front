import React from "react";

export default function CustomerInfo(props) {
  const { showButton, handleDetailButtonClicked, trip_detail_in_lord } = props;
  const { alert_list } = trip_detail_in_lord;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Alert Information</div>
          {showButton && (
            <button
              className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
              onClick={() => handleDetailButtonClicked("alert")}
            >
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
          )}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">ETA Alert Setting</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Arrival Alert Setting</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">COB Alert Setting</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div>
    </div>
  );
}
