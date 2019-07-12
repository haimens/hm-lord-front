import React from "react";

export default function CouponCard(props) {
  return (
    <div className={props.fullWidth ? "col-6" : "col-12 col-md-6  mb-4 hm-pointer-cursor"}>
      <div className="px-4 py-3 shadow-sm rounded-custom text-white coupon-card" style={{ height: "90px" }}>
        <div className="d-flex justify-content-between">
          <div className="hm-text-16">New Member Discount</div>
          <div className="hm-text-16 text-danger">7.99</div>
        </div>

        <div className="d-flex justify-content-between">
          <div className="hm-text-14 mt-1">30% OFF</div>
          <div className="hm-text-16 text-danger mt-3">
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`}
              className="hm-pointer-cursor"
              alt="delete"
              style={{ height: "25px", width: "25px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
