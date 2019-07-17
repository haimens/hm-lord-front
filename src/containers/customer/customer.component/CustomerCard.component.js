import React, { Component } from "react";

export default class CustomerCard extends Component {
  render() {
    const { customerName, customerImage, customerPhone, customerUsername, customer_token } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-3 mb-4"}>
        <div
          className="col-12 rounded-custom shadow-sm bg-white hm-pointer-cursor"
          style={{ height: "140px" }}
          onClick={() => this.props.history.push(`/customer/detail/${customer_token}`)}
        >
          <div className="row h-100 d-flex align-items-center">
            <div className="col-5 d-flex justify-content-center">
              <img
                src={customerImage}
                className="rounded-circle"
                style={{ height: "74px", width: "74px" }}
                alt="Driver"
              />
            </div>
            <div className="col-7">
              <div className="font-weight-bold hm-text-15 text-modal-color">{customerName}</div>
              <div className="text-secondary-color hm-text-12">
                <div>{customerPhone}</div>
              </div>
              <div className="text-secondary-color hm-text-12">{customerUsername}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
