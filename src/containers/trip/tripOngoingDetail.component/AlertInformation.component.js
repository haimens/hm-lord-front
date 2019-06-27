import React, { Component } from "react";

export default class AlertInformation extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row bg-white shadow-sm p-3">
          <div className="col-12 pb-3">
            <div className="font-weight-bold">ETA ALert Setting:</div>
            <div className="row">
              <div className="col-2">Time:</div>
              <div className="col-10">14:00 PM</div>
            </div>
            <div className="row">
              <div className="col-2">Triggered State:</div>
              <div className="col-10">14:00 PM</div>
            </div>
          </div>

          <div className="col-12 pb-3">
            <div className="font-weight-bold">Arrival ALert Setting:</div>
            <div className="row">
              <div className="col-2">Time:</div>
              <div className="col-10">14:00 PM</div>
            </div>
            <div className="row">
              <div className="col-2">Triggered State:</div>
              <div className="col-10">14:00 PM</div>
            </div>
          </div>

          <div className="col-12 pb-3">
            <div className="font-weight-bold">COB ALert Setting:</div>
            <div className="row">
              <div className="col-2">Time:</div>
              <div className="col-10">14:00 PM</div>
            </div>
            <div className="row">
              <div className="col-2">Triggered State:</div>
              <div className="col-10">14:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
