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
      <div className={this.props.fullWidth ? "col-6" : "col-6 col-md-4 col-lg-3 mb-3"}>
        <div
          className="col-12 p-3 rounded-custom shadow-sm bg-white d-flex align-items-center"
          style={{ height: "140px" }}
        >
          <div className="row ">
            <div className="col-4 d-flex align-items-center">
              <img
                src={`${process.env.PUBLIC_URL}/img/${driverImage}`}
                className="rounded-circle"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
              />
            </div>
            <div className="col-8">
              <div className="font-weight-bold my-2">{driverName}</div>
              <div className="text-muted">
                <div>{driverPhone}</div>
                <div>{driverEmail}</div>
              </div>
              <div className="text-muted">{driverUsername}</div>
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
