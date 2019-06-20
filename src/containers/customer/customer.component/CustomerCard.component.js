import React, { Component } from "react";

export default class CustomerCard extends Component {
  render() {
    const {
      customerId,
      customerName,
      customerImage,
      customerPhone,
      customerEmail,
      customerUsername,
      isActive
    } = this.props.parentProps;
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <div className="col-12 p-3 shadow-sm bg-white ">
          <div className="d-flex justify-content-between">
            <div>
              <div>{`Customer #${customerId}`}</div>
              <div className="my-2 font-weight-bold">{customerName}</div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/img/${customerImage}`}
              className="rounded-circle"
              style={{ height: "48px", width: "48px" }}
              alt="Customer"
            />
          </div>
          <div className="text-muted">
            <div>{customerPhone}</div>
            <div>{customerEmail}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-muted">{customerUsername}</div>
            {isActive ? <div className="text-success">Active</div> : <div className="text-danger">Inactive</div>}
          </div>
        </div>
      </div>
    );
  }
}
