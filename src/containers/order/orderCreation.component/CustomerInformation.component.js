import React, { Component } from "react";
import CustomerInformationItem from "./customerInformation.component/CustomerInformation.item";
import { SearchBar } from "../../../components/shared";

export default class CustomerInformation extends Component {
  render() {
    return (
      <div className="mb-4 bg-white shadow-sm p-3" style={{ minHeight: "542px" }}>
        <div className="d-flex justify-content-between ">
          <h5 className="font-weight-bold">Customer Information</h5>
          <button className="btn hm-bg-green text-white" onClick={this.handleAddingDriver}>
            <span>
              <i className="fas fa-plus mr-2" />
            </span>
            New Customer
          </button>
        </div>

        <p className="py-1">Find Existing Customer</p>
        <div className="row">
          <div className="col-9">
            <SearchBar className={"form-control"} />
            <ul className="list-group">
              <CustomerInformationItem
                handleCustomerInformationItemClicked={this.handleCustomerInformationItemClicked}
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
