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
      <Modal
        title="Add Vehicle"
        onClose={this.handleClose}
        position="center"
        getWidth={"580px"}
        getHeight={"416px"}
        zIndex="1080"
      >
        <div className="container-fluid">
          <div className="col-12 my-4">
            <SearchBar className={"form-control"} />
            <AddingVehicleItem handleAddingTripItemClicked={this.handleAddingTripItemClicked} />
          </div>
          <div className="col-12 mb-4">
            <div className="row">
              <VehicleCard
                parentProps={{
                  vehicleId: "1000016",
                  vehicleName: "Lebron James",
                  vehicleImage: "unnamed.jpg",
                  vehiclePhone: "6266266266"
                }}
                fullWidth={true}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center pt-3">
            <button className="btn hm-bg-green text-white px-4 mr-3">Add</button>
            <button className="btn btn-outline-secondary px-4">Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
}
