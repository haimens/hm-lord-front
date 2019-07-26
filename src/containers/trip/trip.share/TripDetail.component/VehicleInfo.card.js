import React from "react";

export default function VehicleInfoCard(props) {
  const { showEditButton, handleDetailButtonClicked, trip_detail_in_lord } = props;
  const { identifier, plate_num, description, img_path } = trip_detail_in_lord.car_info;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Vehicle Information</div>
          {showEditButton && (
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
              alt="Customer"
              className="rounded-circle hm-pointer-cursor"
              style={{ height: "25px", width: "25px" }}
              onClick={() => handleDetailButtonClicked("vehicle")}
            />
          )}
        </div>
        {img_path && (
          <img
            src={img_path}
            alt="Customer"
            className="rounded-circle my-3"
            style={{ height: "74px", width: "74px" }}
          />
        )}
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Identifier</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{identifier ? identifier : "N/A"}</div>
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Plate Number</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{plate_num ? plate_num : "N/A"}</div>
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Description</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{description ? description : "N/A"}</div>
        </div>
      </div>
    </div>
  );
}
