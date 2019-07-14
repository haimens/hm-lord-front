import React, { Component } from "react";
import { Modal } from "../../../components/shared";
import { parseAmount } from "../../../actions/utilities.action";
import alertify from "alertifyjs";

export default class AddingSalaryModal extends Component {
  state = {
    amount: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleCreatingWage = () => {
    const { createSalaryInDriver, driver_token } = this.props;
    const { amount } = this.state;
    if (amount !== "") {
      createSalaryInDriver(driver_token, {
        amount: amount * 100
      });
      this.handleClose();
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  handleClose = () => {
    this.props.onClose();
  };
  render() {
    const { amount } = this.state;
    const { sum, driver_name } = this.props;
    return (
      <Modal title="Add Salary" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"400px"}>
        <div className="container">
          <div className="p-3">
            <div className="form-group mb-4">
              <label htmlFor="Driver" className="font-weight-500 hm-text-14 text-secondary-color">
                Driver
              </label>
              <div className="text-modal-color font-weight-bold hm-text-14">{driver_name}</div>
            </div>

            <div className="form-group mb-4">
              <label className="font-weight-500 hm-text-14 text-secondary-color" htmlFor="Driver">
                Available Balance
              </label>
              <div className="text-modal-color font-weight-bold hm-text-14">{parseAmount(sum)}</div>
            </div>

            <div className="form-group input-group mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white border-right-0 text-modal-color font-weight-bold hm-text-14">
                  $
                </span>
              </div>
              <input
                type="text"
                className="form-control hm-input-height border-right-0 border-left-0"
                id="amount"
                placeholder="Salary Amount"
                value={amount}
                onChange={this.handleInputChange}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white border-left-0 text-modal-color font-weight-bold hm-text-14">
                  .00
                </span>
              </div>
            </div>

            <div className="form-group text-right pt-3">
              <button
                className="button-main-background btn button-main-size px-4 text-white mr-3"
                onClick={this.handleCreatingWage}
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
