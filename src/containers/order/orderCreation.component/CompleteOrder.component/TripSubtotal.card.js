import React from "react";
import { GMapLocation } from "../../../../components/shared";
export default function TripSubtotal(props) {
  const { showEditButton, from_address_info, to_address_info } = props;
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
        {from_address_info.addr_str !== "" && (
          <div style={{ height: "183px" }}>
            <GMapLocation
              position={{
                center: {
                  lat: from_address_info.lat,
                  lng: from_address_info.lng
                },
                origin: {
                  lat: from_address_info.lat,
                  lng: from_address_info.lng
                },
                destination: {
                  lat: to_address_info.lat,
                  lng: to_address_info.lng
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
