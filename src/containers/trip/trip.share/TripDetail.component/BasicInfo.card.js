import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../../actions/utilities.action";
export default function BasicInfoCard(props) {
  const { showEditButton, handleDetailButtonClicked, trip_detail_in_lord, handleFlightButton } = props;
  const { basic_info, from_address_info, to_address_info, flight_info } = trip_detail_in_lord;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Basic Information</div>
          {showEditButton && (
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
              alt="Customer"
              className="rounded-circle hm-pointer-cursor"
              style={{ height: "25px", width: "25px" }}
              onClick={() => handleDetailButtonClicked("basic", trip_detail_in_lord)}
            />
          )}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Pickup Time</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">
          {convertUTCtoLocal(basic_info.pickup_time, "YYYY-MM-DD HH:mm")}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">From</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{from_address_info.addr_str}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">To</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{to_address_info.addr_str}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Flight Information</div>
        <div className="hm-text-14 text-modal-color font-weight-bold mt-1">
          <button
            style={{
              width: "88px",
              height: "28px",
              borderRadius: "5px",
              border: "solid 1px #32325d"
            }}
            onClick={() => handleFlightButton(basic_info)}
            className="bg-white text-modal-color font-weight-bold"
          >
            {basic_info.flight_str !== " " ? basic_info.flight_str : "N/A"}
          </button>
          {basic_info.flight_str && basic_info.flight_str !== " " && flight_info && !flight_info.flight_token && (
            <div className="btn-group dropup">
              <button
                type="button"
                className="dropdown-toggle removeAfter"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ border: "none", outline: "none" }}
              >
                <i className="fas fa-exclamation-circle text-danger ml-3" style={{ fontSize: "16px" }} />
              </button>

              <div
                className="dropdown-menu hm-main-text-12 border-0 shadow hm-main-textColor-sub p-3 triangle-bottom"
                style={{ width: "260px" }}
              >
                Flight string existed but no flight selected!
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Vehicle Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{basic_info.vehicle_type}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Trip Amount</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{parseAmount(basic_info.amount, 2)}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Note</div>
        <div className="d-flex">
          <div className="hm-text-14 text-modal-color font-weight-bold">{basic_info.note || "N/A"}</div>
          {!basic_info.note && basic_info.order_note && basic_info.order_note !== " " && (
            <div className="btn-group dropup">
              <button
                type="button"
                className="dropdown-toggle removeAfter"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ border: "none", outline: "none" }}
              >
                <i className="fas fa-exclamation-circle text-danger ml-3" style={{ fontSize: "16px" }} />
              </button>

              <div
                className="dropdown-menu hm-main-text-12 border-0 shadow hm-main-textColor-sub p-3 triangle-bottom"
                style={{ width: "260px" }}
              >
                Order note existed but no trip note
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Type</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">{basic_info.type_str || "N/A"}</div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Status</div>
        <div className="hm-text-14 text-modal-color font-weight-bold">
          {basic_info.status_str === "DISPATCHED" ? (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">DISPATCHED</div>
            </div>
          ) : basic_info.status_str === "ON-THE-WAY" ? (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle pending-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">ON-THE-WAY</div>
            </div>
          ) : (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle text-purple mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">{basic_info.status_str}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
