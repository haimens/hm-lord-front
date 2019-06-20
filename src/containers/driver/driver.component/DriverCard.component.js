import React, { Component } from "react";

export default class DriverCard extends Component {
  render() {
    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <div className="col-12 p-3 shadow-sm bg-white ">
          <div className="d-flex justify-content-between">
            <div>
              <div>Driver #1000016</div>
              <div className="my-2 font-weight-bold">Lebron James</div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/img/unnamed.jpg`}
              className="rounded-circle"
              style={{ height: "48px", width: "48px" }}
              alt="Driver"
            />
          </div>
          <div className="text-muted">
            <div>6266266266</div>
            <div>lebronjames@gmail.com</div>
            <div>lebronjames123</div>
          </div>
        </div>
      </div>
    );
  }
}
