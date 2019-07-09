import React, { Component } from "react";

export default class VehicleCard extends Component {
  render() {
    const { vehicleId, vehicleName, vehicleImage, isActive } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-4 mb-4"}>
        <div className="col-12 rounded-custom shadow-sm bg-white " style={{ height: "140px" }}>
          <div className="row h-100 align-items-center">
            <div className="col-6 d-flex justify-content-center">
              <img
                src={`${process.env.PUBLIC_URL}/img/${vehicleImage}`}
                className="rounded-circle"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
              />
            </div>
            <div className="col-6 ">
              <div className="font-weight-bold my-2">{vehicleName}</div>
              <div className="text-muted">
                <div>{vehicleId}</div>
              </div>
              {isActive ? (
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
