import React, { Component } from "react";

export default class DriverCard extends Component {
  render() {
    const { handleDeleteDriver, parentProps } = this.props;
    const { driverName, driverImage, driverPhone, driverUsername, driver_token, driver_car_token } = parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-3 mb-4"}>
        <div className="col-12 rounded-custom shadow-sm bg-white" style={{ height: "140px" }}>
          <div className="row h-100 align-items-center">
            <div className="col-5 d-flex justify-content-center">
              <img
                src={driverImage}
                className="rounded-circle  hm-pointer-cursor"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
                onClick={() => this.props.history.push(`/driver/detail/${driver_token}`)}
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold text-modal-color hm-text-15 my-2">{driverName}</div>
              <div className="text-secondary-color hm-text-12">{driverPhone}</div>
              <div className="text-secondary-color hm-text-12">{driverUsername}</div>
              {handleDeleteDriver && (
                <div className="d-flex justify-content-end mt-3">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`}
                    className="hm-pointer-cursor ml-auto"
                    alt="delete"
                    style={{ height: "25px", width: "25px" }}
                    onClick={() => handleDeleteDriver(driver_car_token)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
