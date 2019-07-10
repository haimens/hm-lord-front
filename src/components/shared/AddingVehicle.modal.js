import React, { Component } from "react";
import Modal from "./Modal";

export default class AddingVehicleModal extends Component {
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCarBeenClicked = car_token => {
    const { handleCarBeenClicked } = this.props;
    handleCarBeenClicked(car_token);
    this.handleClose();
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    console.log(this.props);
    const { vehicle_list_in_lord, car_list_for_a_driver } = this.props;
    return (
      <Modal title="Vehicle" onClose={this.handleClose} position="center" getWidth={"400px"} getHeight={"550px"}>
        <div className="rounded-custom">
          <div className="border-bottom-custom  d-flex align-items-center" style={{ height: "60px" }}>
            <div className="input-group pl-4 pr-1">
              <div className="input-group-prepend col-1 p-0 d-flex justify-content-center align-items-center">
                <span className="input-group-text border-0 bg-white">
                  <i className="fas fa-search" />
                </span>
              </div>
              <input
                className="form-control border-0 hm-text-14"
                style={{ height: "56px" }}
                name="company_name"
                id="company_name"
                placeholder={"Search"}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="container">
            {car_list_for_a_driver.record_list.length > 0 &&
              car_list_for_a_driver.record_list.map((vehicle, index) => (
                <div className="col-12 border-bottom d-flex align-items-center" key={index} style={{ height: "92px" }}>
                  <div className="col-3">
                    <img src={vehicle.img_path} alt="driver-avatar" className="avatar-md rounded-circle " />
                  </div>
                  <div className="col-9">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="font-weight-bold hm-text-16 text-modal-color">{vehicle.identifier}</div>
                        <div className=" hm-text-14 text-modal-color">{vehicle.plate_num}</div>
                      </div>
                      <div>
                        <button
                          className="btn button-main-background text-dark shadow-sm"
                          onClick={() => this.handleCarBeenClicked(vehicle.car_token)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {vehicle_list_in_lord.record_list.map((vehicle, index) => (
              <div className="col-12 border-bottom d-flex align-items-center" key={index} style={{ height: "92px" }}>
                <div className="col-3">
                  <img src={vehicle.img_path} alt="driver-avatar" className="avatar-md rounded-circle " />
                </div>
                <div className="col-9">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="font-weight-bold hm-text-16 text-modal-color">{vehicle.identifier}</div>
                      <div className=" hm-text-14 text-modal-color">{vehicle.plate_num}</div>
                    </div>
                    <div>
                      <button
                        className="btn button-main-background text-white shadow-sm"
                        onClick={() => this.handleCarBeenClicked(vehicle.car_token)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }
}
