import React, { Component } from "react";

export default class VehicleCard extends Component {
  render() {
    const { vehicleId, vehicleName, vehicleImage, vehiclePhone } = this.props.parentProps;
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <div className="col-12 p-3 shadow-sm bg-white ">
          <div className="d-flex justify-content-between">
            <div>
              <div>{`Vehicle ${vehicleId}`}</div>
              <div className="my-2 font-weight-bold">{vehicleName}</div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/img/${vehicleImage}`}
              className="rounded-circle"
              style={{ height: "48px", width: "48px" }}
              alt="vehicle"
            />
          </div>
          <div className="text-muted">
            <div>{vehiclePhone}</div>
          </div>
        </div>
      </div>
    );
  }
}
