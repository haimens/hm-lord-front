import React from "react";
export default function TipCard(props) {
  const { showEditButton } = props;
  return (
    <div>
      <div className="purple-border p-3">
        <div className="d-flex justify-content-between align-items-center  ">
          <div className="hm-text-16 font-weight-bold text-modal-color">Tip</div>
          {showEditButton && (
            <button className="rounded-circle bg-white company-detail-button d-flex justify-content-center align-items-center">
              <i className="fas fa-pencil-alt" style={{ color: "#fb6240" }} />
            </button>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="container-fluid">
          <div
            className="tip-card  rounded-custom shadow-sm d-flex flex-column justify-content-between p-4"
            style={{ height: "110px" }}
          >
            <div className="row text-white">
              <div className="col-12 hm-text-14 font-weight-500">Tip 10%</div>
            </div>
            <div className="row text-white">
              <div className="col-12">
                <div className="d-flex align-items-center mt-auto">
                  <div className="hm-text-16 font-weight-500">$10.00</div>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`}
                    className="hm-pointer-cursor ml-auto"
                    alt="delete"
                    style={{ height: "25px", width: "25px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
