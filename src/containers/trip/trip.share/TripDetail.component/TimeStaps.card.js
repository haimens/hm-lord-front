import React from "react";
import { convertUTCtoLocal } from "../../../../actions/utilities.action";

export default function TimeStapsCard(props) {
  const { showEditButton } = props;
  const { start_time, arrive_time, cob_time, cad_time } = props.trip_detail_in_lord.basic_info;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Time Stamps</div>
          {showEditButton && (
            <button
              className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center"
              onClick={() => props.handleDetailButtonClicked("stamps")}
            >
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
          )}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Start Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">
          {start_time ? convertUTCtoLocal(start_time, "YYYY-MM-DD HH:mm") : "N/A"}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">Arrive Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">
          {arrive_time ? convertUTCtoLocal(arrive_time, "YYYY-MM-DD HH:mm") : "N/A"}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">COB Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">
          {cob_time ? convertUTCtoLocal(cob_time, "YYYY-MM-DD HH:mm") : "N/A"}
        </div>
      </div>
      <div className="mb-4 px-3">
        <div className="text-secondary-color font-weight-500 hm-text-14">CAD Time</div>
        <div className="hm-text-14 font-weight-bold text-modal-color">
          {cad_time ? convertUTCtoLocal(cad_time, "YYYY-MM-DD HH:mm") : "N/A"}
        </div>
      </div>
    </div>
  );
}
