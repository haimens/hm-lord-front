import React from "react";

export default function CustomerInformation(props) {
  return (
    <div className="row pt-2">
      <div className="col-8">
        <div className="rounded-custom-top bg-white">
          <div className="d-flex justify-content-between align-items-center p-3" style={{ height: "65px" }}>
            <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
              Create New Customer
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
