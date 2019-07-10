import React, { Component } from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";
export default class TripCard extends Component {
  render() {
    const { parentProps, dotColor, history, hideDriver } = this.props;
    const { tripDriver, tripCustomer, tripPickUp, tripFrom, tripTo, trip_token, tripStatus } = parentProps;
    return (
      <div
        className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 col-lg-4 mb-4 hm-pointer-cursor"}
        onClick={() => {
          history.push(`/trip/upcoming/detail/${trip_token}`);
        }}
      >
        <div className="px-4 py-3 shadow-sm rounded-custom bg-white">
          <div className="row">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-4 text-modal-color font-weight-bold">
                  <div>Pickup time:</div>
                </div>
                <div className="col-8 text-secondary-color">
                  <div>{convertUTCtoLocal(tripPickUp, "YYYY-MM-DD HH:mm")}</div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 text-modal-color font-weight-bold">
                  <div>From:</div>
                </div>
                <div className="col-8 text-secondary-color">
                  <div>{tripFrom}</div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 text-modal-color font-weight-bold">
                  <div>To:</div>
                </div>
                <div className="col-8 text-secondary-color">
                  <div>{tripTo}</div>
                </div>
              </div>
              {!hideDriver && (
                <div className="row mb-3">
                  <div className="col-4 text-modal-color font-weight-bold">
                    <div>Driver:</div>
                  </div>
                  <div className="col-8 text-secondary-color">
                    <div>{tripDriver}</div>
                  </div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col-4 text-modal-color font-weight-bold">
                  <div>Customer:</div>
                </div>
                <div className="col-8 text-secondary-color">
                  <div>{tripCustomer}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-end">
                    <i className={`fas fa-circle  ${dotColor} mr-3`} style={{ fontSize: "6px" }} />
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
