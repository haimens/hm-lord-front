import React from "react";
import { parseAmount, parseRate } from "../../actions/utilities.action";

export default function CouponCard(props) {
  const { amount, rate, type, order_discount_token, code } = props.discount;
  return (
    <div className={props.fullWidth ? "col-6" : "col-12 col-md-6  mb-4 hm-pointer-cursor"}>
      <div className="px-4 py-3 shadow-sm rounded-custom text-white coupon-card" style={{ height: "90px" }}>
        <div className="d-flex justify-content-between">
          <div className="hm-text-16">{code}</div>
        </div>

        <div className="d-flex justify-content-between">
          {type === 1 ? (
            <div className="hm-text-14 mt-1">{parseAmount(amount, 2)}OFF</div>
          ) : (
            <div className="hm-text-14 mt-1">{parseRate(rate)}OFF</div>
          )}
          <div className="hm-text-16 text-danger mt-3">
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_delete_white.svg`}
              className="hm-pointer-cursor"
              alt="delete"
              style={{ height: "25px", width: "25px" }}
              onClick={() => props.handleDeleteCouponFromOrder(order_discount_token)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
