import React, { Component } from "react";
import { Modal } from "../../../../components/shared";
import alertify from "alertifyjs";
import { parseAmount } from "../../../../actions/utilities.action";

export default class EditAmountModal extends Component {
  state = {
    amount: "",
    trip_token: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleClose = () => {
    this.props.onClose();
  };

  handleAddingAddon = async () => {
    const { amount, trip_token } = this.state;
    const { updateTripBasicInfo, position } = this.props;
    if (amount !== "") {
      updateTripBasicInfo(
        trip_token,
        {
          amount: amount * 100
        },
        position
      );
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  componentDidMount() {
    const { currAmount, trip_token } = this.props;
    this.setState({ amount: (currAmount / 100).toFixed(2), trip_token });
  }

  render() {
    const { amount } = this.state;
    return (
      <Modal
        title={`Update Amount`}
        onClose={this.handleClose}
        position="center"
        getWidth={"467px"}
        getHeight={"250px"}
      >
        <div className="container">
          <div className="p-3">
            <div className="form-group input-group my-4">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white border-right-0">$</span>
              </div>
              <input
                type="text"
                className="form-control hm-input-height  border-left-0"
                id="amount"
                placeholder="Amount"
                value={amount}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group text-right pt-3">
              <button
                className="button-main-background btn button-main-size px-4 text-white mr-3"
                onClick={this.handleAddingAddon}
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
