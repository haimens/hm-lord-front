import React, { Component } from "react";

export default class DriverCard extends Component {
  handleDriverCardBeenClicled = () => {
    this.props.history.push(`/driver/detail/${"asdf"}`);
  };
  render() {
    const { driverName, driverImage, driverPhone, driverUsername, isActive } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-3 mb-4 hm-pointer-cursor"}>
        <div
          className="col-12 rounded-custom shadow-sm bg-white "
          style={{ height: "140px" }}
          onClick={this.handleDriverCardBeenClicled}
        >
          <div className="row h-100 align-items-center">
            <div className="col-5 d-flex justify-content-center">
              <img
                src={driverImage}
                className="rounded-circle"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold text-modal-color hm-text-15 my-2">{driverName}</div>
              <div className="text-secondary-color hm-text-12">{driverPhone}</div>
              <div className="text-secondary-color hm-text-12">{driverUsername}</div>
              {isActive ? (
                <section className="hm-text-14 my-2">
                  <div className=" d-flex align-items-center">
                    <i className="fas fa-circle success-text-color mr-3" style={{ fontSize: "6px" }} />
                    <div className="font-weight-500 text-main-color hm-text-12">Active</div>
                  </div>
                </section>
              ) : (
                <section className="hm-text-14 my-2">
                  <div className=" d-flex align-items-center">
                    <i className="fas fa-circle text-danger mr-3" style={{ fontSize: "6px" }} />
                    <div className="font-weight-500 text-main-color hm-text-12">Inactive</div>
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
