import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";
import { GMapLocation } from "../../../components/shared";
export default function TripSubtotal(props) {
  const { showEditButton } = props;

  const saveToAddress = () => {};
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color mb-4">Trip Map</div>
          {showEditButton && (
            <button className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center">
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
          )}
        </div>
        <div style={{ height: "183px" }}>
          <GMapLocation
            position={{
              center: {
                lat: 0,
                lng: 0
              },
              origin: {
                lat: 0,
                lng: 0
              },
              destination: {
                lat: 0,
                lng: 0
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
