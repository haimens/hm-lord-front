import React, { Component } from "react";
import { Modal } from "../../../components/shared";

export default class AddingCouponModal extends Component {
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
        title="Add Coupon"
        onClose={this.handleClose}
        position="center"
        getWidth={"580px"}
        getHeight={"381px"}
        zIndex="1080"
      >
        <div className="container-fluid">
          <div className="col-12 my-4">
            <div className="form-group">
              <label htmlFor="company_name">Coupon Name</label>
              <input className="form-control" name="company_name" id="company_name" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="company_name">Coupon Amount</label>
              <div className="input-group">
                <input
                  className="form-control"
                  name="company_name"
                  id="company_name"
                  onChange={this.handleInputChange}
                />
                <div class="input-group-append">
                  <button class="btn hm-bg-green text-white" type="button">
                    $
                  </button>
                  <button class="btn hm-bg-green text-white" type="button">
                    %
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company_name">Minimal Amount</label>
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
