import React, { Component } from "react";

export default class DriverCard extends Component {
  render() {
    const {
      driverId,
      driverName,
      driverImage,
      driverPhone,
      driverEmail,
      driverUsername,
      isActive
    } = this.props.parentProps;
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <div className="col-12 p-3 shadow-sm bg-white ">
          <div className="d-flex justify-content-between">
            <div>
              <div>{`Driver #${driverId}`}</div>
              <div className="my-2 font-weight-bold">{driverName}</div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/img/${driverImage}`}
              className="rounded-circle"
              style={{ height: "48px", width: "48px" }}
              alt="Driver"
            />
          </div>
          <div className="text-muted">
            <div>{driverPhone}</div>
            <div>{driverEmail}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-muted">{driverUsername}</div>
            {isActive ? <div className="hm-text-green">Active</div> : <div className="text-danger">Inactive</div>}
          </div>
        </div>
      </div>
    );
  }
}
