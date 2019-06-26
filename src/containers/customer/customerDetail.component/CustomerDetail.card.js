import React, { Component } from "react";

export default class CustomerDetailCard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row bg-white p-3">
          <div className="col-12  mb-4">
            <div className="font-weight-bold">
              Vehicle Information <i className="fas fa-pen ml-3" />
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-2">
              <div className="col-6 font-weight-bold">Customer Number</div>
              <div className="col-6">10015</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Customer Name</div>
              <div className="col-6">Lebron James</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Customer Cell</div>
              <div className="col-6">6266666666</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Customer Email</div>
              <div className="col-6">Lebron@gmail.com</div>
            </div>
          </div>

          <div className="col-6">
            <div className="row mb-2">
              <div className="col-6 font-weight-bold">Created On</div>
              <div className="col-6">06/16 16.30</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Username</div>
              <div className="col-6">06/16 16.30</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Address</div>
              <div className="col-6">06/16 16.30</div>
            </div>
            <div className="row mb-2">
              <div className="col-6  font-weight-bold">Img</div>
              <div className="col-6">
                <img
                  src={`${process.env.PUBLIC_URL}/img/unnamed.jpg`}
                  alt="driver_img"
                  style={{ height: "24px", width: "24px" }}
                  className="rounded-circle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
