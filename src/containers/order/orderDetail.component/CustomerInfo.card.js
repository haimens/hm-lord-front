import React from "react";

export default function BasicInfo(props) {
  const { order_detail, history } = props;
  const { name, cell, email, img_path, addr_str, note, customer_token } = order_detail.customer_info;
  return (
    <>
      <div>
        <div className="purple-border p-3">
          <div className="d-flex justify-content-between align-items-center  ">
            <div className="hm-text-16 font-weight-bold text-modal-color">Customer Information</div>
            <div className="d-flex">
              <img
                src={`${process.env.PUBLIC_URL}/img/icon_chat.svg`}
                alt="Customer"
                className="rounded-circle my-3 hm-pointer-cursor mr-2"
                style={{ height: "25px", width: "25px" }}
              />
              <img
                src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`}
                alt="Customer"
                className="rounded-circle my-3 hm-pointer-cursor"
                style={{ height: "25px", width: "25px" }}
                onClick={() => history.push(`/customer/detail/${customer_token}`)}
              />
            </div>
          </div>
          <img
            src={img_path}
            alt="Customer"
            className="rounded-circle my-3"
            style={{ height: "74px", width: "74px" }}
          />
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Customer Name</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{name}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Cell</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{cell}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Email</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{email}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Address</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{addr_str}</div>
        </div>
        <div className="mb-4 px-3">
          <div className="text-secondary-color font-weight-500 hm-text-14">Special Note</div>
          <div className="hm-text-14 font-weight-bold text-modal-color">{note ? note : "N/A"}</div>
        </div>
        <div className="mb-4 px-3">
          <button
            className="btn shadow-sm rounded-custom button-main-background text-white"
            style={{ height: "43px", width: "168px" }}
          >
            Send confirmation
          </button>
        </div>
      </div>
    </>
  );
}
