import React, { Component } from "react";
import { Modal, SearchBar, VehicleCard } from "../../../components/shared";
import AddingVehicleItem from "./AddingVehicleModal.component/AddingVehicle.item";

export default class AddingVehicleModal extends Component {
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
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
            <div className="d-flex align-items-center border-bottom" style={{ height: "94px" }}>
              <div className="container">
                <div className="row">
                  <div className="col-3 d-flex justify-content-end">
                    <img
                      src={`${process.env.PUBLIC_URL}/img/hd.png`}
                      alt="driver-avatar"
                      className="avatar-md rounded-circle "
                    />
                  </div>
                  <div className="col-9 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="font-weight-bold hm-text-16 text-modal-color">Chris Yao</div>
                      <div className=" hm-text-14 text-modal-color">12431241414</div>
                    </div>
                    <div>
                      <button className="btn button-main-background text-white shadow-sm">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
