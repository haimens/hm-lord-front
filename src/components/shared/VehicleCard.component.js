import React, { Component } from "react";

export default class VehicleCard extends Component {
  handleButtonClick = vehicleToken => {
    if (!this.props.deleteButton) {
      this.props.history.push(`/vehicle/detail/${vehicleToken}`);
    }
  };
  handleDeleteACar = driver_car_token => {
    this.props.updateACarForADriver(this.props.driver_token, driver_car_token, { status: 0 });
  };
  render() {
    const { showButton, deleteButton, history } = this.props;
    const { vehicleId, vehicleName, vehicleImage, vehicleToken, car_token, driver_car_token } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-3 mb-4"}>
        <div
          className={`col-12 rounded-custom border shadow-sm bg-white ${!deleteButton && "hm-pointer-cursor"}`}
          style={{ height: "140px" }}
          onClick={() => this.handleButtonClick(vehicleToken)}
        >
          <div className="row h-100 d-flex align-items-center">
            <div className="col-5 d-flex justify-content-center">
              <img
                src={vehicleImage}
                className="rounded-circle hm-pointer-cursor"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
                onClick={() => history.push(`/vehicle/detail/${car_token}`)}
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold hm-text-15 text-modal-color my-2">{vehicleName}</div>
              <div className="text-secondary-color hm-text-12">
                <div>{vehicleId}</div>
              </div>
              {showButton && (
                <section className="d-flex justify-content-end font-weight-500 text-main-color hm-text-14">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/icon_delete.svg`}
                    className="hm-pointer-cursor"
                    onClick={() => this.handleDeleteACar(driver_car_token)}
                    alt="delete"
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
