import React, { Component } from "react";
import { Modal, DriverCard, SearchBar } from "../../../components/shared";
import AddingDriverModalItem from "./AddingDriverModal.component.js/AddingDriver.item";

export default class AddingDriverModal extends Component {
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
        title="Add Company Admin"
        onClose={this.handleClose}
        position="center"
        getWidth={"580px"}
        getHeight={"434px"}
        zIndex="1080"
      >
        <div className="container-fluid">
          <div className="col-12 my-4">
            <SearchBar className={"form-control"} />
            <AddingDriverModalItem handleAddingTripItemClicked={this.handleAddingTripItemClicked} />
          </div>
          <div className="col-12 mb-4">
            <div className="row">
              <DriverCard
                parentProps={{
                  driverId: "1000016",
                  driverName: "Lebron James",
                  driverImage: "unnamed.jpg",
                  driverPhone: "6266266266",
                  driverEmail: "lebronjames@gmail.com",
                  driverUsername: "lebronjames123",
                  isActive: true
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
