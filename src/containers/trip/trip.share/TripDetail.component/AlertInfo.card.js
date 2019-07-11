import React from "react";
import { convertUTCtoLocal } from "../../../../actions/utilities.action";
export default function AlertInfoCard(props) {
  const { showEditButton, handleDetailButtonClicked, trip_detail_in_lord } = props;
  const { alert_list } = trip_detail_in_lord;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Alert Information</div>
          {showEditButton && alert_list.length === 0 && (
            <button
              className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
              onClick={() => handleDetailButtonClicked("alert")}
            >
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
          )}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">ETA Alert Setting</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">
          {alert_list.length > 0 && alert_list[0].record_time !== ""
            ? convertUTCtoLocal(alert_list[0].record_time, "YYYY-MM-DD HH:mm")
            : "N/A"}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Arrival Alert Setting</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">
          {alert_list.length > 0 && alert_list[1].record_time !== ""
            ? convertUTCtoLocal(alert_list[1].record_time, "YYYY-MM-DD HH:mm")
            : "N/A"}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">COB Alert Setting</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">
          {alert_list.length > 0 && alert_list[2].record_time !== ""
            ? convertUTCtoLocal(alert_list[2].record_time, "YYYY-MM-DD HH:mm")
            : "N/A"}
        </div>
      </div>
    </div>
  );
}
