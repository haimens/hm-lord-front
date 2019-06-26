import React, { Component } from "react";
import { Modal } from "../../../components/shared";

export default class AddingWageModal extends Component {
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
        getHeight={"456px"}
        zIndex="1080"
      >
        <div className="container-fluid">
          <div className="col-12 my-4">
            <div className="form-group">
              <label htmlFor="company_name">Driver</label>
              <p>Lebron James</p>
            </div>
            <div className="form-group">
              <label htmlFor="company_name">Amount</label>
              <input className="form-control" name="company_name" id="company_name" onChange={this.handleInputChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="inputGroupSelect01">Type</label>

              <select className="form-control" id="inputGroupSelect01">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="company_name">Note</label>
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
