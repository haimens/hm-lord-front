import React, { Component } from "react";
import CreditCard from "./paymentInformation.component/CreditCard.component";
import moment from "moment";
export default class PaymentInformation extends Component {
  render() {
    return (
      <div
        className="mb-4 bg-white shadow-sm p-3 d-flex flex-column justify-content-between"
        style={{ minHeight: "542px" }}
      >
        <div className="row">
          <div className="col-12 d-flex justify-content-between ">
            <h5 className="mb-4 font-weight-bold">Prepay Information</h5>
          </div>
          <div className="mb-4 col-12">
            <CreditCard />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary px-4 mr-3">Back</button>
          <button className="btn hm-bg-green text-white px-4">Next</button>
        </div>
      </div>
    );
  }
}
