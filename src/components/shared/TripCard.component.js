import React, { Component } from "react";

export default class TripCard extends Component {
  render() {
    const { parentProps, dotColor, tripStatus } = this.props;
    const { tripDriver, tripCustomer, tripPickUp, tripFrom, tripTo } = parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-4 mb-4 hm-pointer-cursor"}>
        <div className="px-4 py-3 shadow-sm rounded-custom bg-white">
          <div className="row">
            <div className="col-4 text-modal-color font-weight-bold">
              <div className="mb-2">Pickup time:</div>
              <div className="mb-2">From</div>
              <div className="mb-2">To</div>
              <div className="mb-2">Driver</div>
              <div>Customer</div>
            </div>
            <div className="col-8 text-secondary-color">
              <div className="mb-2">{tripPickUp}</div>
              <div className="mb-2">{tripFrom}</div>
              <div className="mb-2">{tripTo}</div>
              <div className="mb-2">{tripDriver}</div>
              <div className="d-flex justify-content-between">
                <div>{tripCustomer}</div>
                <div className="text-center hm-text-14 mr-3 mt-2">
                  <div className=" d-flex align-items-center float-right float-lg-none">
                    <i className={`fas fa-circle col-3 offset-md-3 ${dotColor}`} style={{ fontSize: "6px" }} />
                    <div className="font-weight-500 text-main-color">{tripStatus}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
