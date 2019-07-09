import React, { Component } from "react";
import { Modal } from "../../../components/shared";

export default class AddingWageModal extends Component {
  state = {
    amount: "",
    type: "",
    note: ""
  };
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.props.onClose();
  };
  render() {
    const { amount, type, note } = this.state;
    return (
      <Modal title="Add Wage" onClose={this.handleClose} position="center" getWidth={"467px"} getHeight={"473px"}>
        <div className="container">
          <div className="p-3">
            <div className="form-group mb-4">
              <label htmlFor="Driver" className="font-weight-500 hm-text-14 text-secondary-color">
                Driver
              </label>
              <div className="text-modal-color font-weight-bold hm-text-14">Chris Yao</div>
            </div>

            <div className="form-group mb-4">
              <input
                className="form-control hm-input-height mt-3"
                name="amount"
                id="amount"
                placeholder={"Amount"}
                value={amount}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control hm-input-height "
                name="type"
                id="type"
                placeholder={"Type"}
                value={type}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control hm-input-height "
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
                onClick={this.handleCreatingCompany}
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
