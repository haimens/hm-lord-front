import React from "react";

export default function DriverInfoCard(props) {
  const { showEditButton, handleDetailButtonClicked, trip_detail_in_lord } = props;
  const { driver_info } = trip_detail_in_lord;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Driver Information</div>
          {showEditButton && (
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
              alt="Customer"
              className="rounded-circle hm-pointer-cursor"
              style={{ height: "25px", width: "25px" }}
              onClick={() => handleDetailButtonClicked("driver")}
            />
          )}
        </div>
        {trip_detail_in_lord.driver_info.driver_token && (
          <img
            src={driver_info.img_path}
            alt="Driver"
            className="rounded-circle my-3"
            style={{ height: "74px", width: "74px" }}
          />
        )}
      </div>
      {trip_detail_in_lord.driver_info.driver_token && (
        <>
          <div className="mb-4 px-3">
            <div className="text-secondary-color font-weight-500 hm-text-14">Driver Name</div>
            <div className="hm-text-14 font-weight-bold text-modal-color">{driver_info.name}</div>
          </div>
          <div className="mb-4 px-3">
            <div className="text-secondary-color font-weight-500 hm-text-14">Cell</div>
            <div className="hm-text-14 font-weight-bold text-modal-color">{driver_info.cell}</div>
          </div>
          <div className="mb-4 px-3">
            <div className="text-secondary-color font-weight-500 hm-text-14">Email</div>
            <div className="hm-text-14 font-weight-bold text-modal-color">{driver_info.email}</div>
          </div>
        </>
      )}
    </div>
  );
}
