import React, { Component } from "react";
import { Modal } from "../../../components/shared";

export default class AddingPaymentResourceModal extends Component {
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
        title="Add Salary"
        onClose={this.handleClose}
        position="center"
        getWidth={"580px"}
        getHeight={"384px"}
        zIndex="1080"
      >
        <div className="container-fluid">
          <div className="col-12 my-4">
            <div className="form-group">
              <label htmlFor="company_name">Account_Id</label>
              <input className="form-control" name="company_name" id="company_name" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="company_name">Auth_Token</label>
              <input className="form-control" name="company_name" id="company_name" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="company_name">From_Num</label>
              <input className="form-control" name="company_name" id="company_name" onChange={this.handleInputChange} />
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
