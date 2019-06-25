import React, { Component } from "react";
import { Modal, TripCard, SearchBar } from "../../../components/shared";
import AddingTripItem from "./AddingTripModal.component/AddingTrip.item";

export default class AddingTripModal extends Component {
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
            <AddingTripItem handleAddingTripItemClicked={this.handleAddingTripItemClicked} />
          </div>
          <div className="col-12 mb-4">
            <div className="row">
              <TripCard
                parentProps={{
                  tripId: "1000016",
                  tripDriver: "Lebron James",
                  tripCustomer: "Kevin Love",
                  tripPickUp: "06/16 16:30 PM",
                  tripFrom: "Pasadena",
                  tripTo: "Arcadia"
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
