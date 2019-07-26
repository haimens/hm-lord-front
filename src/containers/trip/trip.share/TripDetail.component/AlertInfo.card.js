import React from "react";
import { convertUTCtoLocal } from "../../../../actions/utilities.action";
export default function AlertInfoCard(props) {
  const { showEditButton, handleDetailButtonClicked, trip_detail_in_lord, handleEditButton } = props;
  const { alert_list } = trip_detail_in_lord;
  let showbutton = false;
  if (
    alert_list.length > 0 &&
    alert_list[0].record_time !== "" &&
    alert_list[1].record_time !== "" &&
    alert_list[2].record_time !== ""
  ) {
    showbutton = true;
  }
  let statusArray = ["N/A", "Pending", "Active", "Triggered", "Muted"];
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="hm-text-16 font-weight-bold text-modal-color">Alert Information</div>
          {showEditButton && alert_list.length === 0 && (
            <img
              src={`${process.env.PUBLIC_URL}/img/icon_edit.svg`}
              alt="Customer"
              className="rounded-circle hm-pointer-cursor"
              style={{ height: "25px", width: "25px" }}
              onClick={() => handleDetailButtonClicked("alert")}
            />
          )}
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">ETA Alert Setting</div>
          <div className=" d-flex justify-content-between">
            <div className="hm-text-14 font-weight-bold text-modal-color">
              {showbutton ? convertUTCtoLocal(alert_list[0].record_time, "YYYY-MM-DD HH:mm") : "N/A"}
            </div>
            {showbutton && (
              <button
                className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
                onClick={() => handleEditButton("ETA Alert", alert_list[0].alert_token)}
              >
                <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
              </button>
            )}
          </div>
          {showbutton && (
            <div className="hm-text-14 font-weight-bold text-modal-color">{statusArray[alert_list[0].status]}</div>
          )}
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">Arrival Alert Setting</div>
          <div className=" d-flex justify-content-between">
            <div className="hm-text-14 font-weight-bold text-modal-color">
              {showbutton ? convertUTCtoLocal(alert_list[1].record_time, "YYYY-MM-DD HH:mm") : "N/A"}
            </div>
            {showbutton && (
              <button
                className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
                onClick={() => handleEditButton("ARRIVAL Alert", alert_list[1].alert_token)}
              >
                <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
              </button>
            )}
          </div>
          {showbutton && (
            <div className="hm-text-14 font-weight-bold text-modal-color">{statusArray[alert_list[1].status]}</div>
          )}
        </div>
        <div className="mb-4">
          <div className="text-secondary-color font-weight-500 hm-text-14">COB Alert Setting</div>
          <div className=" d-flex justify-content-between">
            <div className="hm-text-14 font-weight-bold text-modal-color">
              {showbutton ? convertUTCtoLocal(alert_list[2].record_time, "YYYY-MM-DD HH:mm") : "N/A"}
            </div>
            {showbutton && (
              <button
                className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
                onClick={() => handleEditButton("COB Alert", alert_list[2].alert_token)}
              >
                <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
              </button>
            )}
          </div>
          {showbutton && (
            <div className="hm-text-14 font-weight-bold text-modal-color">{statusArray[alert_list[2].status]}</div>
          )}
        </div>
      </div>
    </div>
  );
}
