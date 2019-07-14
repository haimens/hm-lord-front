import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";

export default class AddonModal extends Component {
  state = {
    amount: "",
    note: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleClose = () => {
    this.props.onClose();
  };

  handleAddingAddon = async () => {
    const { amount, note } = this.state;
    const { createAddonToTrip, order_token, trip_token, position, title } = this.props;
    if (amount !== "" && note !== "") {
      createAddonToTrip(order_token, trip_token, position, {
        amount: amount * 100,
        note,
        type: title === "An Add-on" ? 2 : 1
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  render() {
    const { amount, note } = this.state;
    return (
      <Modal
        title={`Add ${this.props.title}`}
        onClose={this.handleClose}
        position="center"
        getWidth={"467px"}
        getHeight={"350px"}
      >
        <div className="container">
          <div className="p-3">
            <div className="form-group input-group my-4">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white border-right-0">$</span>
              </div>
              <input
                type="text"
                className="form-control hm-input-height border-right-0 border-left-0"
                id="amount"
                placeholder="Amount"
                value={amount}
                onChange={this.handleInputChange}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white border-left-0">.00</span>
              </div>
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control hm-input-height mt-3"
                name="note"
                id="note"
                placeholder={"Note"}
                value={note}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group text-right pt-3">
              <button
                className="button-main-background btn button-main-size px-4 text-white mr-3"
                onClick={this.handleAddingAddon}
              >
                Add
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
