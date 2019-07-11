import React from "react";

export default function CustomerInfoCard(props) {
  const { showEditButton, handleDetailButtonClicked, trip_detail_in_lord } = props;
  const { customer_info } = trip_detail_in_lord;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Customer Information</div>
          {showEditButton && (
            <button
              className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
              onClick={() => handleDetailButtonClicked("customer")}
            >
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
          )}
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/img/hd.png`}
          alt="Customer"
          className="rounded-circle my-3"
          style={{ height: "74px", width: "74px" }}
        />
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Customer Name</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{customer_info.name}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Cell</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{customer_info.cell}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Email</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{customer_info.email}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Address</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{"N/A"}</div>
      </div>
      {/* <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Order ID</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">{123}</div>
      </div> */}
    </div>
  );
}