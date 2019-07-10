import React from "react";

export default function CustomerInfo(props) {
  const { showButton, handleDetailButtonClicked, trip_detail_in_lord } = props;
  const { identifier, plate_num, description, img_path } = trip_detail_in_lord.car_info;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Vehicle Information</div>
          {showButton && (
            <button
              className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
              onClick={() => handleDetailButtonClicked("vehicle")}
            >
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
          )}
        </div>
        <img src={img_path} alt="Customer" className="rounded-circle my-3" style={{ height: "74px", width: "74px" }} />
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Identifier</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{identifier}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Plate Number</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{plate_num}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Description</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{description}</div>
      </div>
    </div>
  );
}
