import React, { Component } from "react";
import { Modal } from "../../../components/shared";
import alertify from "alertifyjs";

export default class BasicInfoModal extends Component {
  state = {
    contact_name: "",
    contact_cell: "",
    area: "+1"
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleCreateADriverInLord = () => {
    const { contact_name, contact_cell, area } = this.state;
    const { order_token, updateOrderDetailInLord } = this.props;
    if (contact_name !== "" && contact_cell !== "" && area !== "") {
      updateOrderDetailInLord(order_token, {
        contact_name,
        contact_cell: `${area} ${contact_cell}`
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  saveToAddress = address => {
    this.setState({ company_address: address });
  };

  async componentDidMount() {
    const { contact_cell, contact_name } = this.props.order_info;
    await this.setState({ area: contact_cell.split(" ")[0], contact_cell: contact_cell.split(" ")[1], contact_name });
  }

  render() {
    const { contact_name, contact_cell, area } = this.state;
    return (
      <Modal
        title="Update Contact Information"
        onClose={this.handleClose}
        position="center"
        getWidth={"467px"}
        getHeight={"320px"}
      >
        <div className="container">
          <div className="p-3">
            <div className="form-group mb-4">
              <input
                className="form-control hm-input-height mt-3"
                name="contact_name"
                id="contact_name"
                placeholder={"Contact Name"}
                value={contact_name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group input-group mb-4 d-flex">
              <input
                type="text"
                className="form-control hm-input-height col-2"
                id="area"
                placeholder="Area"
                value={area}
                onChange={this.handleInputChange}
              />

              <input
                type="text"
                className="form-control hm-input-height "
                id="contact_cell"
                placeholder="Contact Cell"
                value={contact_cell}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group text-right pt-3">
              <button
                className="button-main-background btn button-main-size px-4 text-white mr-3"
                onClick={this.handleCreateADriverInLord}
              >
                Update
              </button>
              <button onClick={this.handleClose} className="btn button-main-size btn-outline-secondary px-4">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
