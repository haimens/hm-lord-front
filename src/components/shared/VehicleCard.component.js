import React, { Component } from "react";

export default class VehicleCard extends Component {
  render() {
    const { showButton } = this.props;
    const { vehicleId, vehicleName, vehicleImage, vehicleToken, isActive } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-4 mb-4"}>
        <div
          className="col-12 rounded-custom shadow-sm bg-white hm-pointer-cursor "
          style={{ height: "140px" }}
          onClick={() => {
            this.props.history.push(`/vehicle/detail/${vehicleToken}`);
          }}
        >
          <div className="row h-100 align-items-center">
            <div className="col-5 d-flex justify-content-center">
              <img
                src={vehicleImage}
                className="rounded-circle"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold my-2">{vehicleName}</div>
              <div className="text-muted">
                <div>{vehicleId}</div>
              </div>
              {showButton && (
                <section className="d-flex justify-content-end font-weight-500 text-main-color hm-text-14">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`}
                    className="hm-pointer-cursor"
                    alt="delete"
                  />
                </section>
              )}
              {!showButton &&
                (isActive ? (
                  <section className="hm-text-14 my-2">
                    <div className=" d-flex align-items-center">
                      <i className="fas fa-circle success-text-color mr-3" style={{ fontSize: "6px" }} />
                      <div className="font-weight-500">Active</div>
                    </div>
                  </section>
                ) : (
                  <section className="hm-text-14 my-2">
                    <div className=" d-flex align-items-center">
                      <i className="fas fa-circle text-danger mr-3" style={{ fontSize: "6px" }} />
                      <div className="font-weight-500">Inactive</div>
                    </div>
                  </section>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
