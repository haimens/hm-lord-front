import React, { Component } from "react";

export default class CustomerCreationInOrderForm extends Component {
  state = {
    customer_name: "",
    customer_cell: "",
    customer_email: "",
    customer_address: "",
    customer_city: "",
    customer_state: "",
    customer_zipCode: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  render() {
    const {
      customer_name,
      customer_cell,
      customer_email,
      customer_address,
      customer_city,
      customer_state,
      customer_zipCode
    } = this.state;
    return (
      <div className="col-12">
        <hr className="my-4" />
        <p>Create New Customer</p>
        <div className="row my-4">
          <div className="col-lg-4 col-12">
            <label className="font-weight-bold" htmlFor="customer_name">
              Name
            </label>
            <div>
              <input
                type="text"
                id="customer_name"
                className="form-control"
                onChange={this.handleInputChange}
                value={customer_name}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <label className="font-weight-bold" htmlFor="customer_cell">
              Cell
            </label>
            <div>
              <input
                type="text"
                id="customer_cell"
                className="form-control"
                onChange={this.handleInputChange}
                value={customer_cell}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <label className="font-weight-bold" htmlFor="customer_email">
              Email
            </label>
            <div>
              <input
                type="text"
                id="customer_email"
                className="form-control"
                onChange={this.handleInputChange}
                value={customer_email}
              />
            </div>
          </div>
          <div className="col-12 my-4">
            <label className="font-weight-bold" htmlFor="customer_address">
              Email
            </label>
            <div>
              <input
                type="text"
                id="customer_address"
                className="form-control"
                onChange={this.handleInputChange}
                value={customer_address}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <label className="font-weight-bold" htmlFor="customer_city">
              City
            </label>
            <div>
              <input
                type="text"
                id="customer_city"
                className="form-control"
                onChange={this.handleInputChange}
                value={customer_city}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <label className="font-weight-bold" htmlFor="customer_state">
              State
            </label>
            <div>
              <input
                type="text"
                id="customer_state"
                className="form-control"
                onChange={this.handleInputChange}
                value={customer_state}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <label className="font-weight-bold" htmlFor="customer_zipCode">
              Zip Code
            </label>
            <div>
              <input
                type="text"
                id="customer_zipCode"
                className="form-control"
                onChange={this.handleInputChange}
                value={customer_zipCode}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn hm-bg-green text-white px-4">Create</button>
        </div>
      </div>
    );
  }
}
