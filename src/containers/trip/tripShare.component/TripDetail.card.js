import React, { Component } from "react";

export default class TripOngoingDetailCard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row bg-white shadow-sm p-3">
          <div className="col-12  mb-4">
            <div className="font-weight-bold">
              Vehicle Information <i className="fas fa-pen ml-3" />
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-2">
              <div className="col-6 font-weight-bold">Trip Number:</div>
              <div className="col-6">10015</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Pickup Time:</div>
              <div className="col-6">Lebron James</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">From</div>
              <div className="col-6">6266666666</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">To</div>
              <div className="col-6">Lebron@gmail.com</div>
            </div>
          </div>

          <div className="col-6">
            <div className="row mb-2">
              <div className="col-6 font-weight-bold">Status</div>
              <div className="col-6">06/16 16.30</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Driver</div>
              <div className="col-6">06/16 16.30</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Customer</div>
              <div className="col-6">06/16 16.30</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Vehicle</div>
              <div className="col-6">06/16 16.30</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Flight Information</div>
              <div className="col-6">06/16 16.30</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
