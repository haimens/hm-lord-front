import React, { Component } from "react";
import { convertUTCtoLocal } from "../../actions/utilities.action";
export default class TripCard extends Component {
  handleTripCardPushed = trip_token => {
    const { history, parentProps } = this.props;
    const { tripStatus } = parentProps;
    if (tripStatus === "CONFIRMED") {
      history.push(`/trip/upcoming/detail/${trip_token}`);
    } else if (
      tripStatus === "COB" ||
      tripStatus === "DISPATCHED" ||
      tripStatus === "ARRIVED" ||
      tripStatus === "COB" ||
      tripStatus === "ON-THE-WAY" ||
      tripStatus === "PENDING"
    ) {
      history.push(`/trip/ongoing/detail/${trip_token}`);
    } else {
      history.push(`/trip/finished/detail/${trip_token}`);
    }
  };
  render() {
    const { parentProps, hideDriver } = this.props;
    const { tripDriver, tripCustomer, tripPickUp, tripFrom, tripTo, trip_token, tripStatus } = parentProps;
    return (
      <div className={this.props.fullWidth ? "col-6" : "col-12 col-md-6 mb-4"}>
        <div
          className="px-4 py-3 shadow-sm rounded-custom bg-white border  hm-pointer-cursor"
          onClick={() => this.handleTripCardPushed(trip_token)}
        >
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
                    <div className="hm-text-12 text-modal-color font-weight-bold">
                      {tripStatus === "DISPATCHED" ? (
                        <div className="d-flex align-items-center ">
                          <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
                          <div className="text-modal-color hm-text-12  font-weight-500">DISPATCHED</div>
                        </div>
                      ) : tripStatus === "ON-THE-WAY" ? (
                        <div className="d-flex align-items-center ">
                          <i className="fas fa-circle pending-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
                          <div className="text-modal-color hm-text-12  font-weight-500">ON-THE-WAY</div>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center ">
                          <i className="fas fa-circle text-purple mr-3 pl-0" style={{ fontSize: "6px" }} />
                          <div className="text-modal-color hm-text-12  font-weight-500">{tripStatus}</div>
                        </div>
                      )}
                    </div>
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
