import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GAutoComplete } from "../../../components/shared";
import { findCustomerListInLord, createACustomerInLord } from "../../../actions/customer.action";
import { createNewAddressInstance } from "../../../actions/address.action";
import { setMapToFalse, setMapToFalseAgain } from "../../../actions/quote.action";
import alertify from "alertifyjs";

class CustomerInformation extends Component {
  state = {
    name: "",
    cell: "",
    area: "+1",
    email: "",
    customer: "",
    address_str: ""
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  saveToAddress = address => {
    this.setState({ address_str: address[0].formatted_address });
  };

  handleInputHasChanged = () => {};

  handleCreatingCompany = async () => {
    const { name, cell, area, email, address_str } = this.state;
    const { createNewAddressInstance, createACustomerInLord } = this.props;
    if (name !== "" && cell !== "" && area !== "" && email !== "") {
      const payload = await createNewAddressInstance({ address_str });
      let customer = await createACustomerInLord({
        customer_info: {
          name,
          cell: `${area} ${cell}`,
          email
        },
        address_info: {
          address_token: payload.address_token
        }
      });
      this.props.handleSetCurrentCustomer({ ...this.state, customer_token: customer.customer_token });
      this.props.handleMoveNext(1);
    } else {
      alertify.alert("Error!", "Please Finish The Form!");
    }
  };

  handleSetCurrentCustomer = customer => {
    this.props.handleSetCurrentCustomer(customer);
    this.props.handleMoveNext(1);
  };

  componentDidMount() {
    Promise.all([this.props.findCustomerListInLord(), this.props.setMapToFalse(), this.props.setMapToFalseAgain()]);
  }
  render() {
    const { name, cell, area, email, customer } = this.state;
    const { customer_list_in_lord } = this.props;
    return (
      <div className="row pt-2">
        <div className="col-8">
          <div className="rounded-custom bg-white shadow-sm">
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
              style={{ height: "65px" }}
            >
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                Create New Customer
              </h6>
            </div>
            <div className="p-3">
              <div className="form-group my-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold">Name</label>
                <input
                  className="form-control hm-input-height mt-2"
                  name="name"
                  id="name"
                  placeholder={"Name"}
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mb-4">
                <label className="text-main-color hm-text-14 font-weight-bold">Cell</label>
                <div className="d-flex mt-2">
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
                    id="cell"
                    placeholder="Cell"
                    value={cell}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group mb-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold">Email</label>
                <input
                  className="form-control hm-input-height mt-2"
                  name="email"
                  id="email"
                  placeholder={"Email"}
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group mb-4 ">
                <label className="text-main-color hm-text-14 font-weight-bold mb-2">Address</label>
                <GAutoComplete
                  handleInputHasChanged={this.handleInputHasChanged}
                  getGoogleAddress={this.saveToAddress}
                />
              </div>

              <div className="form-group text-right py-3">
                <button
                  className="button-main-background btn button-main-size px-4 text-white mr-3"
                  onClick={this.handleCreatingCompany}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="rounded-custom bg-white shadow-sm">
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom-custom"
              style={{ height: "65px" }}
            >
              <h6 className="d-block d-flex align-items-center hm-title-sub-size text-main-color font-weight-bold">
                Find Existing Customer
              </h6>
            </div>

            <div className="border-bottom-custom d-flex align-items-center" style={{ height: "65px" }}>
              <div className="input-group pl-4 pr-1" style={{ height: "65px" }}>
                <div className="input-group-prepend col-1 p-0 d-flex justify-content-center align-items-center">
                  <span className="input-group-text border-0 bg-white">
                    <i className="fas fa-search" />
                  </span>
                </div>
                <input
                  className="form-control border-0 hm-text-14"
                  name="customer"
                  id="customer"
                  style={{ height: "63px" }}
                  value={customer}
                  placeholder={"Search"}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="p-3" style={{ height: "466px", overflow: "auto" }}>
              {customer_list_in_lord.record_list.map((customer, index) => (
                <div
                  className="col-12 border-bottom-custom d-flex align-items-center"
                  key={index}
                  style={{ height: "90px" }}
                >
                  <div className="col-3">
                    <img src={customer.img_path} alt="driver-avatar" className="avatar-md rounded-circle " />
                  </div>
                  <div className="col-9">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="font-weight-bold hm-text-16 text-modal-color">{customer.name}</div>
                        <div className=" hm-text-14 text-modal-color">{customer.cell}</div>
                      </div>
                      <div>
                        <button
                          className="btn button-main-background text-white shadow-sm"
                          onClick={() => this.handleSetCurrentCustomer(customer)}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customer_list_in_lord: state.customerReducer.customer_list_in_lord
  };
};
const mapDispatchToProps = {
  findCustomerListInLord,
  createACustomerInLord,
  createNewAddressInstance,
  setMapToFalse,
  setMapToFalseAgain
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomerInformation));
