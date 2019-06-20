import React, { Component } from "react";

export default class OrderCard extends Component {
  render() {
    const { orderId, orderDate, orderName, orderPhone, isActive } = this.props.parentProps;
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <div className="col-12 p-3 shadow-sm bg-white ">
          <div className="d-flex justify-content-between">
            <div>
              <div>{`Order #${orderId}`}</div>
            </div>
            <div>
              <div>{orderDate}</div>
            </div>
          </div>
          <div className="my-3">
            <div className="font-weight-bold">{orderName}</div>
            <div>{orderPhone}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <i className="fas fa-money-check mr-2" />
              Prepaid
            </div>
            {isActive ? <div className="text-success">Active</div> : <div className="text-danger">Inactive</div>}
          </div>
        </div>
      </div>
    );
  }
}
