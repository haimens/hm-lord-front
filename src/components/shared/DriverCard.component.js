import React, { Component } from "react";

export default class DriverCard extends Component {
  render() {
    const { handleDeleteDriver, parentProps } = this.props;
    const { driverName, driverImage, driverPhone, driverUsername, driver_token, driver_car_token } = parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-3 mb-4"}>
        <div className="col-12 rounded-custom shadow-sm bg-white hm-pointer-cursor" style={{ height: "140px" }} onClick={() => this.props.history.push(`/driver/detail/${driver_token}`)}>
          <div className="row h-100 align-items-center">
            <div className="col-5 d-flex justify-content-center">
              <img
                src={driverImage}
                className="rounded-circle  hm-pointer-cursor"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold text-modal-color hm-text-15 my-2">{driverName}</div>
              <div className="text-secondary-color hm-text-12">{driverPhone}</div>
              <div className="text-secondary-color hm-text-12">{driverUsername}</div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
