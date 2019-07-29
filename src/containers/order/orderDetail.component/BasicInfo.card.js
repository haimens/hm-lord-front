import React from "react";
import { parseAmount, convertUTCtoLocal } from "../../../actions/utilities.action";
import alertify from "alertifyjs";
export default function BasicInfo(props) {
  const {
    receipt,
    order_type,
    cdate,
    amount,
    note,
    status_str,
    contact_name,
    contact_cell,
    is_paid
  } = props.order_detail.order_info;
  const handlePayOrderAction = () => {
    props.history.push(`/order/creation/${props.order_token}`);
  };

  const handleFinalizeAndPayOrderAction = () => {
    props.applyFinalOrder(props.order_token);
    props.history.push(`/order/creation/${props.order_token}`);
  };
  const handleCancelOrder = () => {
    alertify.confirm(
      "Are You Sure to Delete This Order",
      () => {
        props.cancelOrder(props.order_token, props.history);
      },
      function() {
        alertify.error("Cancel");
      }
    );
  };

  const handleConfirmOrder = () => {
    props.confirmOrder(props.order_token);
  };
  return (
    <>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Basic Information</div>

          <img
            src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
            onClick={() => props.handleUpdateBasicInfo()}
            alt="Edit"
          />
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Payment Receipt</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{receipt ? receipt : "N/A"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{order_type}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Order Placed Time</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{convertUTCtoLocal(cdate)}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Payment Status</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{is_paid === 0 ? "Not Paid" : "Paid"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Contact Name</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{contact_name}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Contact Cell</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{contact_cell}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Order Total Amount</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{amount ? parseAmount(amount, 2) : "N/A"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Note</div>
        <div
          className={`hm-text-14 text-modal-color font-weight-bold ${note && note !== "undefined" && "text-danger"}`}
        >
          {note && note !== "undefined" ? note : "N/A"}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Status</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">
          {status_str === "DISPATCHED" ? (
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
              <div className="text-modal-color hm-text-14  font-weight-500">{status_str}</div>
            </div>
          )}
        </div>
      </div>
      {is_paid === 0 && (
        <div className="mb-4 px-3">
          <button
            className="border-0 shadow-sm  hm-text-12 text-white font-weight-bold rounded-custom mr-3"
            style={{ height: "43px", width: "98px", backgroundColor: "#f5365d" }}
            onClick={handleCancelOrder}
          >
            Delete
          </button>
          {status_str === "CONFIRMED" && status_str !== "FINALZIED" && (
            <button
              className="border-0 shadow-sm  hm-text-12 text-white font-weight-bold rounded-custom mr-3"
              style={{ height: "43px", width: "98px", backgroundColor: "#2ece89" }}
              onClick={handlePayOrderAction}
            >
              Pay
            </button>
          )}
          {status_str === "FINALZIED" && status_str !== "CONFIRMED" && (
            <button
              className="border-0 shadow-sm  hm-text-12 text-white font-weight-bold rounded-custom mr-3"
              style={{ height: "43px", width: "98px", backgroundColor: "#2ece89" }}
              onClick={handlePayOrderAction}
            >
              Pay
            </button>
          )}
          {status_str !== "FINALIZED" && status_str !== "CONFIRMED" && (
            <button
              className="border-0 shadow-sm  hm-text-12 text-white font-weight-bold rounded-custom mr-3"
              style={{ height: "43px", backgroundColor: "#2ece89" }}
              onClick={handleFinalizeAndPayOrderAction}
            >
              Finalize & Pay
            </button>
          )}

          {status_str === "FINALIZED" && (
            <button
              className="border-0 shadow-sm hm-text-12 text-white font-weight-bold rounded-custom"
              style={{ height: "43px", width: "98px", backgroundColor: "#ffd600" }}
              onClick={handleConfirmOrder}
            >
              Confirm
            </button>
          )}
        </div>
      )}
    </>
  );
}
