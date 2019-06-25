import React, { Component } from "react";

export default class TripCard extends Component {
  render() {
    const { tripId, tripDriver, tripCustomer, tripPickUp, tripFrom, tripTo } = this.props.parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-6 col-md-4 col-lg-3 mb-3"}>
        <div className="col-12 p-3 shadow-sm bg-white ">
          <div className="d-flex justify-content-between">
            <div>{`Trip #${tripId}`}</div>
            <div className="text-primary">COB</div>
          </div>
          <div className="my-2">
            <div className="font-weight-bold">Driver: {tripDriver}</div>
            <div className="font-weight-bold">Customer {tripCustomer}</div>
          </div>
          <div>
            <div className="text-muted">Pickup Time: {tripPickUp}</div>
            <div className="text-muted">From: {tripFrom}</div>
            <div className="text-muted">To: {tripTo}</div>
          </div>
        </div>
      </div>
    );
  }
}
