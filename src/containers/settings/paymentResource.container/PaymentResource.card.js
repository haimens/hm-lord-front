import React, { Component } from "react";

export default class PaymentResourceCard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row bg-white p-3">
          <div className="col-12 mb-4">
            <div className="font-weight-bold">
              Primary Payment Information <i className="fas fa-pen ml-3" />
            </div>
          </div>
          <div className="col-12">
            <div className="row mb-2">
              <div className="col-3 font-weight-bold">Application_Id:</div>
              <div className="col-9">10015</div>
            </div>
            <div className="row mb-2">
              <div className="col-3 font-weight-bold">Location_Id:</div>
              <div className="col-9">Lebron James</div>
            </div>
            <div className="row mb-2">
              <div className="col-3 font-weight-bold">Access_Token:</div>
              <div className="col-9">6266666666</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
